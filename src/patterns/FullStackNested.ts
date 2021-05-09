import { Construct, Environment, RemovalPolicy } from '@aws-cdk/core';
import { BaseStack, BaseStackProps } from '../stacks/BaseStack';
import { CDNNestedStack, CDNNestedStackProps } from '../stacks/cdn/CDNNestedStack';
import { CognitoNestedStack, CognitoNestedStackProps } from '../stacks/cognito/CognitoNestedStack';
import { CoreNestedStack, CoreNestedStackProps } from '../stacks/core/CoreNestedStack';
import {
  ServerlessNestedStackProps,
  ServerlessNestedStack
} from '../stacks/serverless/ServerlessNestedStack';
import { getCertArnForDomain } from '../../lib/aws/certificateManager';
import { getHostedZoneIdForDomain } from '../../lib/aws/route53';
import { CDNConstruct } from '../stacks/cdn/CDNConstruct';
import { bucketExists } from '../../lib/aws/s3';
import { listTableNames } from '../../lib/aws/dynamodb';

export interface FullStackNestedProps extends BaseStackProps {
  env: Required<Environment>;
  stage: string;
  profile?: string;
  devPort?: number | string;
  rootDomain: string;
  core?: Omit<CoreNestedStackProps, 'prefix' | 'rootDomain'>;
  frontend: Omit<
    CDNNestedStackProps,
    'prefix' | 'stage' | 'rootDomain' | 'certificate' | 'hostedZone'
  >;
  backend: Omit<ServerlessNestedStackProps, 'cors' | 'prefix' | 'auth' | 'frontend' | 'env'> & {
    cors?: Partial<ServerlessNestedStackProps['cors']>;
  };
  auth?: Omit<CognitoNestedStackProps, 'prefix'> & {
    loginCallbackPath?: string;
    logoutCallbackPath?: string;
  };
}

export class FullStackNested extends BaseStack {
  constructor(scope: Construct, id: string, props: FullStackNestedProps) {
    super(scope, id, props);
    const {
      env,
      stage,
      devPort,
      rootDomain,
      core: coreProps,
      auth: authProps,
      frontend: frontendProps,
      backend: backendProps
    } = props;

    const buildHzOrCert = !coreProps?.hostedZoneId || !coreProps?.certificateArn;
    const coreStack = new CoreNestedStack(this, 'Core', {
      ...coreProps,
      rootDomain,
      prefix: this.prefix,
      removalPolicy: buildHzOrCert ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY
    });

    const frontendStack = new CDNNestedStack(this, 'Frontend', {
      ...frontendProps,
      prefix: this.prefix,
      stage,
      certificate: coreStack.certificate,
      hostedZone: coreStack.hostedZone,
      rootDomain
    });

    const devAddress = `http://localhost:${devPort ?? 4200}`;
    const urls = (frontendStack.urls ?? []).map(url => `https://${url}`).concat(devAddress);
    const authStack = new CognitoNestedStack(this, 'Auth', {
      ...authProps,
      prefix: this.prefix,
      groups: authProps?.groups ?? [
        {
          groupName: 'admin'
        }
      ],
      userPoolClient: {
        ...(authProps?.userPoolClient ?? {}),
        oAuth: {
          ...(authProps?.userPoolClient?.oAuth ?? {}),
          callbackUrls: urls
            .map(url => url + authProps?.loginCallbackPath ?? '')
            .concat(authProps?.userPoolClient?.oAuth?.callbackUrls ?? []),
          logoutUrls: urls
            .map(url => url + authProps?.logoutCallbackPath ?? '')
            .concat(authProps?.userPoolClient?.oAuth?.logoutUrls ?? [])
        }
      }
    });

    new ServerlessNestedStack(this, 'Backend', {
      ...backendProps,
      env,
      prefix: this.prefix,
      auth: authStack,
      frontend: frontendStack,
      cors: {
        ...(backendProps.cors ?? {}),
        allowOrigins: urls.concat(backendProps.cors?.allowOrigins ?? [])
      }
    });
  }

  static async create(
    scope: Construct,
    id: string,
    props: FullStackNestedProps
  ): Promise<FullStackNested> {
    const core = {
      ...props.core
    } as NonNullable<FullStackNestedProps['core']>;
    core.certificateArn =
      props.core?.certificateArn ??
      (await getCertArnForDomain({
        profile: props.profile,
        domain: props.rootDomain,
        region: props.env.region
      }));

    core.hostedZoneId =
      props.core?.hostedZoneId ??
      (await getHostedZoneIdForDomain({
        profile: props.profile,
        rootDomain: props.rootDomain,
        region: props.env.region
      }));

    const frontend: FullStackNestedProps['frontend'] = {
      ...props.frontend
    };
    const bucketName = CDNConstruct.GET_BUCKET_NAME(props);
    if (await bucketExists({ profile: props.profile, region: props.env.region, bucketName })) {
      frontend.bucketExists = true;
    }

    const backend = {
      ...props.backend,
      existingTables: (await listTableNames(props)).concat(props.backend.existingTables ?? [])
    };

    return new FullStackNested(scope, 'FullStackNestedConstruct', {
      ...props,
      core,
      frontend,
      backend
    });
  }
}
