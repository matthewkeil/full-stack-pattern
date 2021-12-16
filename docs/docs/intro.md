---
sidebar_position: 1
---

# Intro

## tl;dr

```bash
npm i -D full-stack-pattern
```

Use it in your project like [this.  tl;dr...](/docs/intro#use-it)

## The Rundown
This website has in-depth info on all the constructs in the library. There are use case examples for each of them, and a list of what aws resources each deploys. There are also some tips and tricks in there for aws, and specifically how to get the most efficiency out of aws while building with these constructs.

The full-stack-pattern library contains two primary, high-level constructs FullStack and FullNestedStack. Both essentially do the same thing however FullStack is built from individual stack where FullNestedStack is built with one stack that has nested stacks. The interface you build with is identical so switching between the two is seamless.

Both build 5 primary components. The CoreConstruct which handles dns and tls/ssl. The CognitoConstruct which handles the auth. The CDNConstruct that hosts the front end, and other static assets, via a globally edge-cached cdn. Finally compute is handled by a fully ServerlessConstruct that optimizes on cost and maximizes the developer experience. The 5th is a ConfigFile CustomResource, for post deploy uploading of the environment configuration to the bucket hosting the ui.

You will be running on optimally configured S3, CloudFront, ApiGateway, Lambda, DynamoDb, and Cognito. All without knowing anything about aws. If you, or your company, would like help reach out to me [on LinkedIn](https://www.linkedin.com/in/matthew-keil/) or [on github](https://github.com/matthewkeil).

- **Dead simple**
- **Nearly all free (AWS free tier)**
- **World-Class performance**
- **All you need to focus on is writing your application code**

There is a built-in, hot-reloading, dev server for running your lambda code locally. It's built right into the Construct and you can spin up an express server, built to mimic directly the apiGateway and lambda configurations. It will look and feel just like hitting the apiGateway but 100% locally. No-need to modify any code either.

Check out the [docs](https://full-stack-pattern.matthewkeil.com/docs/intro) for more information.

## Constructs within full-stack-pattern

More information about what each does can be found by following the links below:

- [FullStack or FullNestedStack](/docs/fullStack/FullStackConstruct)
- [ServerlessStack or ServerlessNestedStack](/docs/serverless/serverlessConstruct)
- [CognitoStack or CognitoNestedStack](/docs/cognito/cognitoConstruct)
- [CoreStack or CoreNestedStack](/docs/core/CoreConstruct)
- [CDNStack or CDNNestedStack](/docs/cdn/cdnConstruct)
- [ConfigFile](/docs/constructs/configFile)
- [Lambdas](/docs/constructs/Lambdas)
- [Lambda](/docs/constructs/Lambda)
- [Tables](/docs/constructs/configFile)
- [Table](/docs/constructs/Table)
- [Api](/docs/constructs/Api)

There is a lot of good information on this website, and it assumes you already know the basics. As a note, If you have questions and need assistance, please reach out to me [on LinkedIn](https://www.linkedin.com/in/matthew-keil/).

## Use it

```typescript
import { App } from '@aws-cdk/core';
import { FullStack, FullStackProps } from 'full-stack-pattern';

(async function () {
  const app = new App();
  const stage = 'prod';

  const fs = await FullStack.create(app, 'YourApp', {
    stage,
      // full intellisense of the options
    prefix: `best-client-fsp-${stage}`,
    env: {
      region: 'us-east-1',
      account: '123456789012'
    },
    rootDomain: 'example.com',
    subDomain: 'micro-frontend',
    uiDevPort: 3012,
    core: {
      includeSubdomains: true
    },
    cdn: {
      codePaths: [resolve(__dirname, '..', 'frontend', 'build')],
      buildWwwSubdomain: false
    },
    cognito: {
      groups: [
        {
          groupName: 'admin',
          userEmails: ['admin.user@example.com']
        }
      ]
    },
    serverless: {
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
