import { Duration, Environment, RemovalPolicy, StackProps } from '@aws-cdk/core';

import { CoreConstructProps } from '../stacks/core/CoreConstruct';
import { CDNConstructProps } from '../stacks/cdn/CDNConstruct';
import { CognitoConstructProps } from '../stacks/cognito/CognitoConstruct';
import { ServerlessConstructProps } from '../stacks/serverless/ServerlessConstruct';

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
   * Settings for the [CognitoConstruct](https://full-stack-pattern.matthewkeil.com/docs/cognito/cognitoConstruct)
   *
   * rootDomain is not available on core, it is passed in from fullStackProp.rootDomain
   * @param {Cognito} serverless
   */
  cognito?: FullStackCognitoProp;

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
}

export interface FullStackProps
  extends Omit<FullStackConstructProps, 'nested' | 'stackTimeout'>,
    Omit<StackProps, 'env'> {}
