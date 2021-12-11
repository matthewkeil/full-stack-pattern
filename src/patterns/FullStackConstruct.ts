import { Construct, RemovalPolicy } from '@aws-cdk/core';

import { CoreConstruct, CoreConstructProps } from '../stacks/core/CoreConstruct';
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

import { ConfigFile, ConfigFileProps } from '../constructs/ConfigFile';

import { FullStackConstructProps } from './FullStackProps';
import { existingLogGroups } from '../../lib';

export class FullStackConstruct extends Construct {
  /**
   * Is a helper function for the constructor.  You pass in the props you want
   * to use for the FullStackConstruct.  This function will fill some pieces
   * from the environment, for example the hostedZoneId.
   *
   * Calls the underlying stacks to do their own lookups.  For more information
   * see the docs for each stack
   */
  static async lookupExistingResources(
    props: FullStackConstructProps & {
      profile?: string;
    }
    // & { env: Required<Environment> }
  ): Promise<FullStackConstructProps> {
    let baseDomain: string | undefined;
    let core: FullStackConstructProps['core'];

    if (props.rootDomain) {
      if (!props.stage) {
        throw new Error('stage is required when rootDomain is provided');
      }
      baseDomain = `${props.subDomain}.${props.rootDomain}`;
      core = await CoreConstruct.lookupExistingResources({
        ...(props.core ?? {}),
        region: props.env.region,
        profile: props.profile,
        rootDomain: props.rootDomain,
        subDomain: props.subDomain
      });
    } else {
      if (props.core) {
        throw new Error('core is not available when rootDomain is not provided');
      }
    }

    const cdn = !props.cdn
      ? undefined
      : await CDNConstruct.lookupExistingResources({
          ...props.cdn,
          baseDomain,
          stage: props.stage,
          region: props.env.region,
          profile: props.profile
        });

    const serverless: FullStackConstructProps['serverless'] = !props.serverless
      ? undefined
      : {
          ...props.serverless,
          existingLogGroups: await existingLogGroups(props)
          // existingTables: await listTableNames(props)
        };

    return {
      ...props,
      core,
      cdn,
      serverless
    };
  }

  public core?: CoreStack | CoreNestedStack;
  public cdn?: CDNStack | CDNNestedStack;
  public cognito?: CognitoStack | CognitoNestedStack;
  public serverless?: ServerlessStack | ServerlessNestedStack;
  public baseDomain?: string;

  constructor(scope: Construct, id: string, private props: FullStackConstructProps) {
    super(scope, id);
    const { env, stackTimeout, uiDevPort = 3000 } = props;
    const stage = props.stage ?? 'prod';
    const prefix = props.prefix ?? stage;

    if (this.props.rootDomain) {
      const _coreProps: CoreConstructProps = {
        ...(this.props.core ?? {}),
        rootDomain: this.props.rootDomain,
        subDomain: this.props.subDomain,
        removalPolicy:
          this.props.core?.removalPolicy ?? this.props.removalPolicy ?? RemovalPolicy.RETAIN
      };
      this.core = this.props.nested
        ? new CoreNestedStack(this, 'Core', {
            ..._coreProps,
            stackTimeout
          })
        : new CoreStack(this, 'Core', {
            ..._coreProps,
            stackName: `${props.prefix}-core`,
            env
          });
      this.baseDomain = CoreConstruct.getBaseDomain({
        rootDomain: this.props.rootDomain,
        subDomain: this.props.subDomain
      });
    }

    if (this.props.cdn) {
      const cdnProps: CDNConstructProps = {
        ...this.props.cdn,
        prefix,
        stage,
        baseDomain: this.baseDomain,
        certificate: this.core?.certificate,
        hostedZone: this.core?.hostedZone,
        removalPolicy:
          this.props.cdn.removalPolicy ?? this.props.removalPolicy ?? RemovalPolicy.DESTROY
      };
      this.cdn = this.props.nested
        ? new CDNNestedStack(this, 'CDN', {
            ...cdnProps,
            stackTimeout
          })
        : new CDNStack(this, 'CDN', {
            ...cdnProps,
            stackName: `${props.prefix}-cdn`,
            env
          });
    }

    const uiDevAddress = `http://localhost:${uiDevPort ?? 3000}`;
    const urls = (this.cdn?.urls ?? [])
      .map(url => (url.startsWith('http') ? url : `https://${url}`))
      .concat(uiDevAddress);

    if (!this.props.noCognito) {
      const cognitoProps: CognitoConstructProps = {
        ...(this.props.cognito ?? {}),
        userPoolDomain: {
          ...(this.props.cognito?.userPoolDomain ?? {}),
          baseDomain: this.baseDomain,
          stage: this.props.stage,
          certificateArn: this.core?.certificate?.certificateArn
        },
        prefix,
        removalPolicy:
          this.props.cognito?.removalPolicy ?? props.removalPolicy ?? RemovalPolicy.DESTROY,
        userPoolClient: {
          ...(this.props.cognito?.userPoolClient ?? {}),
          oAuth: {
            ...(this.props.cognito?.userPoolClient?.oAuth ?? {}),
            callbackUrls: urls
              .map(url => url + this.props.cognito?.loginCallbackPath ?? '')
              .concat(this.props.cognito?.userPoolClient?.oAuth?.callbackUrls ?? []),
            logoutUrls: urls
              .map(url => url + this.props.cognito?.logoutCallbackPath ?? '')
              .concat(this.props.cognito?.userPoolClient?.oAuth?.logoutUrls ?? [])
          }
        }
      };
      this.cognito = this.props.nested
        ? new CognitoNestedStack(this, 'Auth', {
            ...cognitoProps,
            prefix,
            stackTimeout
          })
        : new CognitoStack(this, 'Auth', {
            ...cognitoProps,
            stackName: `${props.prefix}-cognito`,
            prefix,
            env
          });
    }

    if (this.props.serverless) {
      const _backendProps: ServerlessConstructProps = {
        ...this.props.serverless,
        prefix,
        stage,
        baseDomain: this.baseDomain,
        certificate: this.core?.certificate,
        hostedZone: this.core?.hostedZone,
        removalPolicy:
          this.props.serverless.removalPolicy ?? props.removalPolicy ?? RemovalPolicy.DESTROY,
        defaultCorsPreflightOptions: {
          ...(this.props.serverless.defaultCorsPreflightOptions ?? {}),
          allowOrigins: urls.concat(
            this.props.serverless.defaultCorsPreflightOptions?.allowOrigins ?? []
          )
        }
      };
      this.serverless = this.props.nested
        ? new ServerlessNestedStack(this, 'Backend', {
            ..._backendProps,
            stage,
            prefix,
            stackTimeout
          })
        : new ServerlessStack(this, 'Backend', {
            ..._backendProps,
            stackName: `${props.prefix}-serverless`,
            prefix,
            env
          });
    }
  }

  /**
   * Builds and uploads a configuration file to the ui bucket
   *
   * See [ConfigFile](https://full-stack-pattern.matthewkeil.com/docs/constructs/configFile) for more information
   */
  public addConfigFile({
    config,
    fileName,
    mergeExisting,
    deploymentRole
  }: Pick<
    ConfigFileProps<Record<string, unknown>>,
    'fileName' | 'mergeExisting' | 'config' | 'deploymentRole'
  >) {
    if (!this.cdn) {
      throw new Error('can not add config file without a cdn');
    }
    new ConfigFile(this, 'ConfigFile', {
      config,
      fileName,
      mergeExisting,
      deploymentRole,
      env: this.props.env,
      prefix: this.props.prefix,
      bucket: this.cdn.bucket
    });
  }
}
