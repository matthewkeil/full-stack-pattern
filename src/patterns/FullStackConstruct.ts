import { Duration, Construct, Environment, RemovalPolicy, StackProps, Stack } from '@aws-cdk/core';

import { CoreConstructProps } from '../stacks/core/CoreConstruct';
import { CoreStack } from '../stacks/core/CoreStack';
import { CoreNestedStack } from '../stacks/core/CoreNestedStack';

import { CDNConstruct, CDNConstructProps } from '../stacks/cdn/CDNConstruct';
import { CDNStack } from '../stacks/cdn/CDNStack';
import { CDNNestedStack } from '../stacks/cdn/CDNNestedStack';

import { CognitoConstructProps } from '../stacks/cognito/CognitoConstruct';
import { CognitoStack } from '../stacks/cognito/CognitoStack';
import { CognitoNestedStack } from '../stacks/cognito/CognitoNestedStack';

import { ServerlessConstructProps } from '../stacks/serverless/ServerlessConstruct';
import { ServerlessNestedStack } from '../stacks/serverless/ServerlessNestedStack';
import { ServerlessStack } from '../stacks/serverless/ServerlessStack';

import { getCertArnForDomain } from '../../lib/aws/certificateManager';
import { getHostedZoneIdForDomain } from '../../lib/aws/route53';
import { bucketExists } from '../../lib/aws/s3';
import { existingLogGroups } from '../../lib/aws/cwLogs';
import { ConfigFile, ConfigFileProps } from '../constructs/ConfigFile';

type Core = Omit<CoreConstructProps, 'rootDomain'>;
type Frontend = Omit<CDNConstructProps, 'prefix' | 'stage' | 'rootDomain'>;
type Auth = Omit<CognitoConstructProps, 'prefix'>;
type Backend = Omit<ServerlessConstructProps, 'prefix' | 'stage'>;

export interface FullStackConstructProps {
  readonly env?: Environment;
  /**
   * @description A prefix that will be used for all resource names.  In an effort to
   * prevent resource collisions and promote stack stability across application and
   * cdk construct life cycles. Best practice for this is to use a tiered approach. A
   * process that has worked very well across teams and accounts is:
   *
   * const prefix =`${client}-${project}-${stage}`;
   *
   * Clients tend to do more than one line of business with a good contractor.  The
   * project represents the LOB or other short descriptor.  So in the dev account of
   * "best-client-ever" the project might be "fullstack-sales-plat"
   *
   * @example
   */
  prefix: string;
  stage: string;
  rootDomain: string;
  removalPolicy?: RemovalPolicy;
  nested?: boolean;
  stackTimeout?: Duration;
  uiDevPort?: number | string;

  core?: Core;
  frontend: Frontend;
  backend: Omit<Backend, 'existingLogGroups' | 'existingTables'>;

  auth?: Auth & {
    loginCallbackPath?: string;
    logoutCallbackPath?: string;
  };
}

export interface FullStackProps extends FullStackConstructProps, StackProps {}

export class FullStackConstruct extends Construct {
  public core: CoreStack | CoreNestedStack;
  public frontend: CDNStack | CDNNestedStack;
  public auth: CognitoStack | CognitoNestedStack;
  public backend: ServerlessStack | ServerlessNestedStack;

  constructor(scope: Construct, id: string, private props: FullStackConstructProps) {
    super(scope, id);
    const {
      env,
      prefix,
      stage,
      uiDevPort = 3000,
      rootDomain,
      stackTimeout,
      core: coreProps = {},
      auth: authProps = {},
      frontend: frontendProps,
      backend: backendProps
    } = props;

    const _coreProps: CoreConstructProps = {
      ...coreProps,
      rootDomain,
      removalPolicy: coreProps?.removalPolicy ?? props.removalPolicy ?? RemovalPolicy.RETAIN
    };
    this.core = this.props.nested
      ? new CoreNestedStack(this, 'Core', {
          ..._coreProps,
          stackTimeout
        })
      : new CoreStack(this, 'Core', {
          ..._coreProps,
          env,
          prefix
        });

    const _frontendProps: CDNConstructProps = {
      ...frontendProps,
      prefix,
      stage,
      rootDomain,
      certificate: this.core.certificate,
      hostedZone: this.core.hostedZone,
      removalPolicy: frontendProps.removalPolicy ?? props.removalPolicy ?? RemovalPolicy.DESTROY
    };
    this.frontend = this.props.nested
      ? new CDNNestedStack(this, 'Frontend', {
          ..._frontendProps,
          stackTimeout
        })
      : new CDNStack(this, 'Frontend', {
          ..._frontendProps,
          env
        });

    const uiDevAddress = `http://localhost:${uiDevPort}`;
    const urls = (this.frontend.urls ?? []).map(url => `https://${url}`).concat(uiDevAddress);
    const _authProps: CognitoConstructProps = {
      ...authProps,
      prefix,
      removalPolicy: authProps.removalPolicy ?? props.removalPolicy ?? RemovalPolicy.DESTROY,
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
    };
    this.auth = this.props.nested
      ? new CognitoNestedStack(this, 'Auth', {
          ..._authProps,
          stackTimeout
        })
      : new CognitoStack(this, 'Auth', {
          ..._authProps,
          env
        });

    const _backendProps: ServerlessConstructProps = {
      ...backendProps,
      prefix,
      stage,
      removalPolicy: backendProps.removalPolicy ?? props.removalPolicy ?? RemovalPolicy.DESTROY,
      defaultCorsPreflightOptions: {
        ...(backendProps.defaultCorsPreflightOptions ?? {}),
        allowOrigins: urls.concat(backendProps.defaultCorsPreflightOptions?.allowOrigins ?? [])
      }
    };
    this.backend = this.props.nested
      ? new ServerlessNestedStack(this, 'Backend', {
          ..._backendProps,
          stackTimeout
        })
      : new ServerlessStack(this, 'Backend', {
          ..._backendProps,
          env
        });
  }

  public addConfigFile({
    config,
    fileName,
    mergeExisting,
    deploymentRole
  }: Pick<
    ConfigFileProps<Record<string, unknown>>,
    'fileName' | 'mergeExisting' | 'config' | 'deploymentRole'
  >) {
    new ConfigFile(this, 'ConfigFile', {
      config,
      fileName,
      mergeExisting,
      deploymentRole,
      env: this.props.env,
      prefix: this.props.prefix,
      bucket: this.frontend.bucket
    });
  }

  static async addAccountProps(
    props: FullStackConstructProps & {
      profile: string;
    }
  ): Promise<FullStackConstructProps> {
    const core: Core = props.core ?? {};
    const region = Stack.of(this).region;
    if (!core.certificateArn) {
      core.certificateArn = await getCertArnForDomain({
        profile: props.profile,
        domain: props.rootDomain,
        region
      });
    }
    if (!core.hostedZoneId) {
      core.hostedZoneId = await getHostedZoneIdForDomain({
        profile: props.profile,
        rootDomain: props.rootDomain,
        region
      });
    }

    const frontend = props.frontend;
    let urls: string[] | undefined;
    if (props.rootDomain && props.stage) {
      urls = CDNConstruct.buildUrls({
        rootDomain: props.rootDomain,
        stage: props.stage,
        buildWwwSubdomain: frontend.buildWwwSubdomain
      });
    }
    const bucketName = CDNConstruct.getBucketName({
      prefix: props.prefix,
      bucketName: frontend.bucketName,
      urls
    });
    if (await bucketExists({ profile: props.profile, region, bucketName })) {
      console.log(`Bucket ${bucketName} already exists. Will deploy frontend to existing bucket`);
      frontend.bucketName = bucketName;
    }

    const backend: Backend = {
      ...props.backend,
      existingLogGroups: await existingLogGroups(props)
      // existingTables: await listTableNames(props)
    };

    return {
      ...props,
      core,
      frontend,
      backend
    };
  }
}
