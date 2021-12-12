---
sidebar_position: 1
---

# Getting Started

This construct takes a lot of the complexity of aws away but cdk is not for the faint of heart. You should have a basic understanding of the [AWS CloudFormation](https://aws.amazon.com/cloudformation/) language and the [AWS CDK](https://aws.amazon.com/cdk/) toolkit before diving into the full-stack-pattern. There is a lot of good information on this website, and it assumes you already know the basics. As a note, If you have questions and need assistance, please reach out to me [on LinkedIn](https://www.linkedin.com/in/matthew-keil/).

## tl;dr

```bash
npm i -D full-stack-pattern
```

Then use it in your project like this:

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
