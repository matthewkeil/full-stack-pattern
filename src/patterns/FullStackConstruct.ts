import { Duration, Construct, Environment, RemovalPolicy, StackProps } from '@aws-cdk/core';

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

import { existingLogGroups } from '../../lib/aws/cwLogs';
import { ConfigFile, ConfigFileProps } from '../constructs/ConfigFile';

export type FullStackCognitoProp = Omit<CognitoConstructProps, 'prefix'> & {
  /**
   * The login path to append to all urls.
   *
   * ex. a value of '/auth/login' will result in a cognito callback url of
   * 'http://localhost:3000/auth/login' and the cloudfront cognito url will be
   * 'https://d1mkdh3z21t61o24eles.cloudfront.net/auth/login'
   */
  loginCallbackPath?: string;

  /**
   * The logout path to append to all urls.
   *
   * ex. a value of '/auth/logout' will result in a cognito callback url of
   * 'http://localhost:3000/auth/logout' and the cloudfront cognito url will be
   * 'https://d1mkdh3z21t61o24eles.cloudfront.net/auth/logout'
   */
  logoutCallbackPath?: string;
};

export interface FullStackConstructProps {
  /**
   * The env for the stacks
   */
  env: Required<Environment>;
  /**
   * The deployment stage name.  This will be used to prefix all resources.
   *
   * @default "prod"
   */
  stage?: string;

  /**
   * The prefix to use with resource names. If `prefix` and `name` are
   * provided then the apiName will be `${prefix}-${name}`.  If no name
   * is provided then the apiName will be `prefix`. For more info, see
   * [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   */
  prefix?: string;

  /**
   * The url/rootDomain for the HostedZone.  If you don not provide a
   * rootDomain a CoreConstruct will not be created.
   *
   * @example If you are hosting the ui at `www.example.com` and the api
   * at `api.example.com` the rootDomain would be `example.com`  This is
   * similar for branches, such as `dev.api.example.com` and
   * `dev.example.com`.  The rootDomain will still be `example.com`.
   */
  rootDomain?: string;

  /**
   * Optional: A url subDomain to host the application at. Will still use the
   * HostedZone at rootDomain but all of this application will be hosted at
   * the subDomain
   *
   * Assume your HostedZone is at `rootDomain: "example.com"` and you want to
   * host at `subDomain: "best-app"`
   *
   * This subDomain is the new "default" root of the application
   * - the UI will be at `best-app.example.com` and the
   *   dev branch will be at `dev.best-app.example.com`.
   *   Optionally you can build `www.best-app.example.com`
   *
   * - The Api will be at
   *   `api.best-app.example.com` and the dev api will be at
   *   `dev.api.best-app.example.com`
   */
  subDomain?: string;

  /**
   * Builds the component stacks as either Stack's or NestedStack's
   */
  nested?: boolean;

  /**
   * This is the NestedStack stack timeout that will be applied. For
   * non-nested stacks, this is ignored.
   */
  stackTimeout?: Duration;

  /**
   * RemovalPolicy to apply to all resources.  If a RemovalPolicy prop is provided
   * for a specific resource, ie the `props.core.removalPolicy`, it will
   * override this value
   */
  removalPolicy?: RemovalPolicy;

  /**
   * For standing the development server and configuring cors during development.
   * This is the localhost:PORT that serves your frontend
   */
  uiDevPort?: number | string;

  /**
   * No CognitoConstruct will be built
   */
  noCognito?: boolean;

  /**
   * Settings for the [CoreConstruct](https://full-stack-pattern.matthewkeil.com/docs/core/coreConstruct)
   *
   * Optional: If you do not provide a `rootDomain` this will be ignored and a
   * CoreConstruct will not be built
   *
   * rootDomain is not available on core, it is passed in from
   * fullStackProp.rootDomain
   * @param {Omit<CoreConstructProps, 'rootDomain'>} core
   */
  core?: Omit<CoreConstructProps, 'rootDomain'>;

  /**
   * Settings for the [CDNConstruct](https://full-stack-pattern.matthewkeil.com/docs/cdn/cdnConstruct)
   *
   * Optional: If you do not provide this a CDNConstruct will not be built
   *
   * prefix, stage and rootDomain are not available on fullStackProps.cdn
   * They are passed in from fullStackProp.prefix and fullStackProp.stage
   * and fullStackProp.rootDomain
   * @param {Omit<CDNConstructProps, 'prefix' | 'stage' | 'rootDomain'>} cdn
   */
  cdn?: Omit<CDNConstructProps, 'prefix' | 'stage' | 'rootDomain'>;

  /**
   * Settings for the [ServerlessConstruct](https://full-stack-pattern.matthewkeil.com/docs/serverless/serverlessConstruct)
   *
   * Optional: If you do not provide this a ServerlessConstruct will not be
   * built
   *
   * prefix, stage  are not available on fullStackProps.serverless, they are passed
   * in from fullStackProp.prefix and fullStackProp.stage
   * @param {Omit<ServerlessConstructProps, 'prefix' | 'stage'>} serverless
   */
  serverless?: Omit<ServerlessConstructProps, 'prefix' | 'stage'>;

  /**
   * Settings for the [CognitoConstruct](https://full-stack-pattern.matthewkeil.com/docs/cognito/cognitoConstruct)
   *
   * rootDomain is not available on core, it is passed in from fullStackProp.rootDomain
   * @param {Cognito} serverless
   */
  cognito?: FullStackCognitoProp;
}

export interface FullStackProps
  extends Omit<FullStackConstructProps, 'nested' | 'stackTimeout'>,
    Omit<StackProps, 'env'> {}

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
      baseDomain = CDNConstruct.buildUrls({
        rootDomain: props.rootDomain,
        subDomain: props.subDomain,
        stage: props.stage,
        buildWwwSubdomain: false
      })[0];
      core = await CoreConstruct.lookupExistingResources({
        ...(props.core ?? {}),
        region: props.env.region,
        profile: props.profile,
        rootDomain: props.rootDomain
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
          rootDomain: baseDomain,
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
  public domain?: string;

  constructor(scope: Construct, id: string, private props: FullStackConstructProps) {
    super(scope, id);
    const { env, subDomain, stackTimeout, uiDevPort = 3000 } = props;
    const stage = props.stage ?? 'prod';
    const prefix = props.prefix ?? stage;

    if (this.props.rootDomain) {
      let domain = this.props.rootDomain;
      if (subDomain) {
        domain = `${subDomain}.${domain}`;
      }
      if (stage !== 'prod') {
        domain = `${stage}.${domain}`;
      }
      this.domain = domain;

      const _coreProps: CoreConstructProps = {
        ...(this.props.core ?? {}),
        rootDomain: this.props.rootDomain,
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
    }

    if (this.props.cdn) {
      const cdnProps: CDNConstructProps = {
        ...this.props.cdn,
        prefix,
        stage,
        rootDomain: this.domain,
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
          rootDomain: this.domain,
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
        rootDomain: this.domain,
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
