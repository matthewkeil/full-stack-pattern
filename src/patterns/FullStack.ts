import { Construct, Environment, RemovalPolicy } from '@aws-cdk/core';
import { BaseNestedStack, BaseNestedStackProps } from '../stacks/BaseStack';
import { CDNNestedStack, CDNNestedStackProps } from '../stacks/cdn/CDNNestedStack';
import { CognitoNestedStack, CognitoNestedStackProps } from '../stacks/cognito/CognitoNestedStack';
import { CoreNestedStack, CoreNestedStackProps } from '../stacks/core/CoreNestedStack';
import {
  ServerlessNestedStackProps,
  ServerlessNestedStack
} from '../stacks/serverless/ServerlessNestedStack';
import { getCertArnForDomain } from '../../lib/aws/certificateManager';
import { getHostedZoneIdForDomain } from '../../lib/aws/route53';

export interface FullStackProps extends BaseNestedStackProps {
  env: Required<Environment>;
  stage: string;
  profile?: string;
  devPort?: string;
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
    logoutPath?: string;
    callBackPath?: string;
  };
}

export class FullStack extends BaseNestedStack {
  constructor(scope: Construct, id: string, props: FullStackProps) {
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
            .map(url => url + authProps?.callBackPath ?? '')
            .concat(authProps?.userPoolClient?.oAuth?.callbackUrls ?? []),
          logoutUrls: urls
            .map(url => url + authProps?.logoutPath ?? '')
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

  static async create(scope: Construct, id: string, props: FullStackProps): Promise<FullStack> {
    const certificateArn =
      props.core?.certificateArn ??
      (await getCertArnForDomain({
        profile: props.profile,
        domain: props.rootDomain,
        region: props.env.region
      }));

    const hostedZoneId =
      props.core?.hostedZoneId ??
      (await getHostedZoneIdForDomain({
        profile: props.profile,
        rootDomain: props.rootDomain,
        region: props.env.region
      }));

    return new FullStack(scope, 'AsyncFullStack', {
      ...props,
      core: {
        ...props.core,
        hostedZoneId,
        certificateArn
      }
    });
  }
}
