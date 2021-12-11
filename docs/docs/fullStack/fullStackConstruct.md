---
sidebar_position: 3
---

# FullStackConstruct

The FullStackConstruct is built from of 5 primary components. The CoreStack which handles dns and tls/ssl. The CognitoStack which handles the auth. The CDNStack that hosts the front end, and other static assets, via a globally edge-cached cdn. Finally compute is handled by a fully serverless stack that optimizes on cost and maximizes the developer experience.

The FullStack builds 5 primary components. The CoreStack which handles dns and tls/ssl. The CognitoStack which handles the auth. The CDNStack that hosts the front end, and other static assets, via a globally edge-cached cdn. Finally compute is handled by a fully ServerlessStack that optimizes on cost and maximizes the developer experience.

You will be running on S3, CloudFront, ApiGateway, Lambda, DynamoDb, and Cognito.

If you are aren't convinced by that intro than check out the api's below. Dead simple. Nearly all free via AWS free tier and with world-class performance.

All you need to focus on is writing your application code.

There is a built-in, hot-reloading, dev server for running your lambda code locally. It's built right into the Construct and you can spin up an express server, built to mimic directly the apiGateway and lambda configurations. It will look and feel just like hitting the apiGateway but 100% locally. No-need to modify any code either.

#### Nested Constructs within FullStackConstruct

Based on whether you are using the FullStack or FullNestedStack will determine which of the pairs below you will get deployed. More information about what each does can be found by following the links below:

- [CoreStack or CoreNestedStack](/docs/core/CoreConstruct)
- [CognitoStack or CognitoNestedStack](/docs/cognito/cognitoConstruct)
- [CDNStack or CDNNestedStack](/docs/cdn/cdnConstruct)
- [ServerlessStack or ServerlessNestedStack](/docs/serverless/serverlessConstruct)
- [ConfigFile](/docs/constructs/configFile)

#### Resource types that may be deployed

- cloudformation.Stack
- cloudformation.NestedStack

## Usage Example

```typescript
import { App } from '@aws-cdk/core';
import { FullStack, FullStackProps } from 'full-stack-pattern';

// this is almost the exact code in the FullStack Construct.  If you want
// a stack use FullStack but enjoy the example none the less
class YourApp extends Stack {
  constructor(scope: Construct, id: string, props: FullStackProps) {
    super(scope, id, props);
    new FullStackConstruct(app, 'FullStack', {
      props,
      // cant build stacks in stacks so used nestedStacks
      // within the construct
      nested: true
    });
  }
}

const app = new App();
const stage = 'prod';

new YourApp(app, 'YourApp', {
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

app.synth();
```

## FullStack Construct Methods

For more information on building the ConfigFile, check out this [link](/docs/constructs/configFile)

```typescript
import { FullStack } from 'full-stack-pattern';

const profile = 'best-client'; // profile in your `~aws/credentials` file
const fullStackProps = {
  rootDomain: 'example.com'
  /* see the FullStackConstructProps for setting props */
};

/**
 * Is a helper function for the constructor.  You pass in the props you want
 * to use for the FullStackConstruct.  This function will fill some pieces
 * from the environment, for example the hostedZoneId.
 *
 * Calls the underlying stacks to do their own lookups.  For more information
 * see the docs for each stack
 */
const props = FullStackConstruct.lookupExistingResources({ ...fullStackProps, profile });
/**
 * Lookup added the below based on the rootDomain
 * props = {
 *   core: {
 *     hostedZoneId: "Z02301912N770N82DUCKY",
 *     certificateArn: "arn:aws:acm:us-east-2:123445233500:certificate/a14fc22f-1aac-4e30-8ac2-3dude8c771cf"
 *   }
 * }
 */
const fullStack = new FullStackConstruct(app, 'FullStack', props);

/**
 * Builds and uploads a configuration file to the ui bucket
 *
 * See [ConfigFile](https://full-stack-pattern.matthewkeil.com/docs/constructs/configFile) for more information
 */
fullStack.addConfigFile({
  fileName: 'config.json',
  // safe for use in iam constrained accounts. assume that arn was given to
  // you by the security team to use.  also takes an IRole
  deploymentRole: 'arn:aws:iam::123456789012:role/full-stack-deployment-role',
  config: {
    userPoolId: fs.cognito.userPool.userPoolId,
    userPoolClientId: fs.cognito.userPoolClient.userPoolClientId,
    userPoolDomain: fs.cognito.userPoolDomain?.domain,
    apiUrl: fs.domain && fs.serverless?.domain ? fs.serverless.domain : fs.serverless?.api?.api.url,
    webAppUrl: fs.domain ? fs.domain : fs.cdn?.distribution.distributionDomainName
  }
});
```

## FullStackConstructProps

```typescript
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
