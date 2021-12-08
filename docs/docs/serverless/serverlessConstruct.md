---
sidebar_position: 1
---

# ServerlessConstruct

The ServerlessConstruct is the heart of why this repo exists. It makes building serverless applications a breeze! I know, I built it for yours truly. It is will stand a full serverless backend based on ApiGateway, Lambda and DynamoDb. It is a fully extensible and optimizable shorthand to snapping these core services together.

The are lots of little nuances for working on a serverless stack that I've learned over the years and I've incorporated that here for you. There are lots of little things like automatically putting the table name in the lambda environment through security expertise with hardened IAM practices upholding least privilege.

It's secret power though is the DX (Development eXperience) that comes along with an express backed dev server. That's right. Your construct will both deploy your lambda to aws and it will also be used to construct an express server, using [convert-lambda-to-express](https://www.npmjs.com/package/convert-lambda-to-express), for local development. You'll get hot reloading, full typescript support and a fully functional api based on your ApiGateway settings and your lambda code. Hello dreamy fullstack!

No need to write anything, no need to convert your code from `(event, context) => {}` syntax... just `runDevServer()`.

#### Nested Constructs within ServerlessConstruct

For more information on each of these constructs check out that page. They are all L3 wrappers around their underlying services. They each extend several cdk Constructs so you can find most of the information directly on the cdk docs and through intellisense.

- [Api](/docs/constructs/Api)
- [Lambdas](/docs/constructs/Lambdas)
- [Tables](/docs/constructs/Tables)

#### Resource types that are deployed

- AWS::IAM::Role
- AWS::IAM::Policy
- AWS::Logs::LogGroup
- AWS::DynamoDB::Table
- AWS::Lambda::Function
- AWS::Lambda::Permission
- AWS::Lambda::LayerVersion
- AWS::Route53::RecordSet
- AWS::ApiGateway::RestApi
- AWS::ApiGateway::DomainName
- AWS::ApiGateway::BasePathMapping
- AWS::ApiGateway::GatewayResponse
- AWS::ApiGateway::Deployment
- AWS::ApiGateway::Authorizer
- AWS::ApiGateway::Resource
- AWS::ApiGateway::Method
- AWS::ApiGateway::Stage

## ServerlessConstructProps

```typescript
export interface ServerlessConstructProps
  extends Omit<ApiProps, 'description'>,
    TablesProps,
    Omit<LambdasProps, 'tables'> {}
```

## Usage Example

```typescript
import { Construct } from '@aws-cdk/core';
import { ServerlessStack, ServerlessStackProps } from 'full-stack-patter';
import { startDevServer } from 'convert-lambda-to-express';

export interface YourBackendProps extends ServerlessStackProps {}

export class YourBackend extends ServerlessStack {
  public exportedRoleArn: CfnOutput;

  constructor(scope: Construct, id: string, props: YourBackendProps) {
    super(scope, id, {
      ...props,
      // this is the codePath the devServer will watch for hot reloading
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'src'))
      runtime: Runtime.NODEJS_14_X,
      tables: [
        ...(props.tables ?? []),
        {
        name: 'your-table',
        partitionKey: {
          id: 'string'
        }
      }]
    });

    const handlerName = 'fancy-handler';

    this.lambdas.addLambda({
      /**
       * All LambdaProps, LogGroupProps, RoleProps, PolicyProps
       * are available here.  Provides full type-safe, flexibility
       * of the underlying constructs
       *
       * Check out the Constructs/Lambda doc page for more information
       */
      handler: 'fancyHandler/index.handler',

      // this name gets prefixed so all resources are unique
      name: handlerName,

      /**
       * this will automagically build process.env.TABLE_NAME=`${prefix}-your-table`
       * and add the necessary permissions to access the table
       */
      table: 'your-table',

      /**
       * - this is an api endpoint that will be hot-reloaded during local
       *   development using `convert-express-to-lambda`
       * - this is ALSO your constructs that will turn into aws resources when deployed
       * - has niceties like automatic cors support both in the cloud and when
       *  running locally
       */
      events: [{
        method: 'GET',
        path: '/fancy-path',
        options: { /* Any MethodOptions or IntegrationOptions */}
      }]
    });

    // provides public access to all resources that are created so they can be
    // referenced outside of the Construct
    this.exportedRoleArn = new CfnOutPut(this, 'ExportedRoleArn', {
      value: this.lambdas.resources[handlerName].role
    });
  }

  public startDevServer(port: number) {
    startDevServer({
      port,
      hotReload: true, // watches code and restarts on changes
      corsOptions: {
        origin: '*',
        methods: '*',
        allowedHeaders: '*',
      }
    });
  }
}
```
