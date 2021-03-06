---
sidebar_position: 1
---

# FullStack

The FullStack is the individual Stack version of the FullStackConstruct. FullStack will stand up to 5 Stacks of resources depending on the configuration.

It builds 5 primary components. The CoreStack which handles dns and tls/ssl. The CognitoStack which handles the auth. The CDNStack that hosts the front end, and other static assets, via a globally edge-cached cdn. Finally compute is handled by a fully ServerlessStack that optimizes on cost and maximizes the developer experience.

You will be running on S3, CloudFront, ApiGateway, Lambda, DynamoDb, and Cognito.

If you are aren't convinced by that intro than check out the api's below. Dead simple. Nearly all free via AWS free tier and with world-class performance.

All you need to focus on is writing your application code.

There is a built-in, hot-reloading, dev server for running your lambda code locally. It's built right into the Construct and you can spin up an express server, built to mimic directly the apiGateway and lambda configurations. It will look and feel just like hitting the apiGateway but 100% locally. No-need to modify any code either.

Check out the [docs](/docs/intro) for more information. You will find docs there for all the underlying Constructs.

#### Nested Constructs within FullStack

More information about what each does can be found by following the links below:

- [CoreStack](/docs/core/CoreStack)
- [CognitoStack](/docs/cognito/CognitoStack)
- [CDNStack](/docs/cdn/CDNStack)
- [ServerlessStack](/docs/serverless/ServerlessStack)
- [ConfigFile](/docs/constructs/ConfigFile)

#### Resource types that may be deployed

- cloudformation.Stack

## Usage Example

```typescript
import { App } from '@aws-cdk/core';
import { FullStack, FullStackProps } from 'full-stack-pattern';

(async function() {
  const app = new App();
  const stage = 'prod';

  const fs = await FullStack.create(app, 'YourApp', {
    stage,
    prefix: `bc-full-stack-${stage}`,
    env: {
      region: 'us-east-1',
      account: '123456789012'
    },
    rootDomain: 'example.com',
    subDomain: 'micro-frontend',
    uiDevPort: 3012,
    core: {
      // See CoreConstruct for more information
      includeSubdomains: true
    },
    cdn: {
      // See CDNConstruct for more information
      codePaths: [resolve(__dirname, '..', 'frontend', 'build')],
      buildWwwSubdomain: false
    },
    cognito: {
      // See CognitoConstruct for more information
      groups: [
        {
          groupName: 'admin',
          userEmails: ['admin.user@example.com']
        }
      ]
    },
    serverless: {
      // See ServerlessConstruct for more information
      code: Code.fromAsset(resolve(__dirname, '..', 'backend', 'src')),
      runtime: Runtime.NODEJS_14_X,
      billingMode: BillingMode.PAY_PER_REQUEST,
      tables: [
        {
          name: 'your-table',
          partitionKey: {
            id: 'string'
          }
        }
      ],
      lambdas: [
        {
          handler: 'fancyHandler/index.handler',
          name: 'fancy-handler',
          table: 'your-table',
          events: [
            {
              method: 'GET',
              path: '/fancy-path'
            }
          ]
        }
      ]
    }
  });

  fs.addConfigFile({
    fileName: 'config.json',
    config: {
      userPoolId: fs.cognito.userPool.userPoolId,
      userPoolClientId: fs.cognito.userPoolClient.userPoolClientId,
      userPoolDomain: fs.cognito.userPoolDomain?.domain,
      apiUrl:
        fs.domain && fs.serverless?.domain ? fs.serverless.domain : fs.serverless?.api?.api.url,
      webAppUrl: fs.domain ? fs.domain : fs.cdn?.distribution.distributionDomainName
    }
  });

  app.synth();
})();
```

## FullStackProps

```typescript
export interface FullStackProps
  extends Omit<FullStackConstructProps, 'nested' | 'stackTimeout'>,
    StackProps {}

type Cognito = Omit<CognitoConstructProps, 'prefix'> & {
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
  readonly env?: Environment;

  /**
   * The prefix to use with resource names. If `prefix` and `name` are
   * provided then the apiName will be `${prefix}-${name}`.  If no name
   * is provided then the apiName will be `prefix`. For more info, see
   * [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   */
  prefix: string;

  /**
   * The deployment stage name.  This will be used to prefix all resources.
   *
   * @default "prod"
   */
  stage: string;

  /**
   * The url/rootDomain for the HostedZone.  If you don not provide a
   * rootDomain a CoreConstruct will not be created.
   *
   * @example If you are hosting the ui at `www.example.com` and the api
   * at `api.example.com` the rootDomain would be `example.com`  This is
   * similar for branches, such as `dev.api.example.com` and
   * `dev.example.com`.  The rootDomain will still be `example.com`.
   */
  rootDomain: string;

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
  cognito?: Cognito;
}
```
