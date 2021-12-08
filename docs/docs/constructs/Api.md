---
sidebar_position: 1
---

# Api

Takes some of the complexity out of building serverless api's. Handles cors by default and adds some basic gateway responses to make sure your debugging journey can be focussed on the handler code and not the nuances of using ApiGateway. The construct is fully customizable but setup with some logical defaults to make it easy to get started.

#### Resource types that may be deployed

- AWS::ApiGateway::RestApi
- AWS::ApiGateway::GatewayResponse
- AWS::ApiGateway::Deployment
- AWS::ApiGateway::Authorizer
- AWS::ApiGateway::Resource
- AWS::ApiGateway::Method
- AWS::ApiGateway::Stage

## ApiProps

This construct inherits all props from the L2 RestApi construct. The only difference is that they are all mutable in the event you want to programmatically build the props object before passing it into the construct. There are also a few additional props that were added to support the additional functionality.

See [RestApiProps](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-apigateway.RestApiProps.html) for more information about what is available on the L2 cdk construct

```typescript
export interface ApiProps extends Mutable<RestApiProps> {
  /**
   * The api stage name. This is an alias to the deployOptions.stageName.
   *
   * @default "prod"
   */
  stage?: string;

  /**
   * The name of the api. If `prefix` and `name` are provided then the
   * apiName will be `${prefix}-${name}`.  If no prefix is provided then
   * the apiName will be `name`
   */
  name?: string;

  /**
   * The prefix to use with resource names. If `prefix` and `name` are
   * provided then the apiName will be `${prefix}-${name}`.  If no name
   * is provided then the apiName will be `prefix`. For more info, see
   * [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   */
  prefix?: string;

  /**
   * UserPool to create a gateway authorizer.  It is not required to be added
   * when running the constructor.  Can also add a cognito authorizer with
   * the api.attachCognitoAuthorizer() method
   */
  userPool?: IUserPool;

  /**
   * Gateway responses to add to the api. By default the following responses are added:
   * { type: ResponseType.UNAUTHORIZED, statusCode: '401' }
   * { type: ResponseType.ACCESS_DENIED, statusCode: '403' }
   * { type: ResponseType.RESOURCE_NOT_FOUND, statusCode: '404' }
   * { type: ResponseType.DEFAULT_5XX, statusCode: '500' }
   */
  gatewayResponses?: GatewayResponseOptions[];

  /**
   * Uses `convert-lambda-to-express` to provision a dev server to develop the api.
   *
   * See [convert-lambda-to-express](https://www.npmjs.com/package/convert-lambda-to-express)
   * for more information about how to use this feature.
   *
   * @default true
   */
  buildDevServer?: boolean;

  /**
   * LogicalId for the RestApi resource for in-place upgrades. For more
   * info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   */
  logicalId?: string;

  /**
   * Option to not use fixed logicalId's for the RestApi resource. For more
   * info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   */
  dontOverrideLogicalId?: boolean;
}
```

## Usage Example

```typescript
import { Api, Lambda, CognitoConstruct } from 'ful-stack-pattern';

interface FancyStackProps {
  prefix: string;
}

class FancyStack extends Stack {
  constructor(scope: Construct, id: string, props: FancyStackProps) {
    super(scope, id, props);
    const cognito = new CognitoConstruct(this, 'CognitoConstruct', {
      /* ... */
    });
    const lambda = new Lambda(this, 'Lambda', {
      /* ... */
    });

    const api = new Api(this, 'Api', {
      prefix: props.prefix
    });

    api.attachCognitoAuthorizer(cognito.userPool);

    api.addLambda({
      lambda,
      method: 'GET',
      path: '/fancyPath',
      options: {
        credentialsPassthrough: true, // options object supports all `AwsIntegration.options`
        apiKeyRequired: true // options object supports all `MethodOption`s
      }
    });
  }
}
```
