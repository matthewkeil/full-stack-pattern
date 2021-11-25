import {
  CognitoUserPoolsAuthorizer,
  GatewayResponseOptions,
  IntegrationOptions,
  MethodOptions,
  ResponseType,
  RestApi,
  IResource,
  RestApiProps,
  MockIntegration,
  PassthroughBehavior,
  IRestApi,
  AwsIntegration
} from '@aws-cdk/aws-apigateway';
import { Function as Lambda } from '@aws-cdk/aws-lambda';
import { ServicePrincipal } from '@aws-cdk/aws-iam';
import { Construct } from '@aws-cdk/core';
import { IUserPool } from '@aws-cdk/aws-cognito';
import { Mutable, toPascal, toKebab, HttpMethod } from '../../lib';

export interface ApiProps extends RestApiProps {
  stage: string;
  prefix: string;
  userPool?: IUserPool;
  gatewayResponses?: GatewayResponseOptions[];
}

export class Api extends Construct {
  public api: IRestApi;

  private allowedOrigins: string;
  private allowedMethods: string;
  private allowedHeaders: string;
  private authorizer?: CognitoUserPoolsAuthorizer;

  constructor(scope: Construct, id: string, private props: ApiProps) {
    super(scope, id);

    this.api = new RestApi(this, toPascal(`${this.props.prefix}-RestApi`), {
      ...this.props,
      restApiName: toKebab(this.props.prefix),
      deployOptions: {
        stageName: props.stage
      }
    });

    this.allowedOrigins = this.props.defaultCorsPreflightOptions?.allowOrigins
      ? `"${this.props.defaultCorsPreflightOptions.allowOrigins.join(',')}"`
      : '"*"';
    this.allowedMethods = this.props.defaultCorsPreflightOptions?.allowMethods
      ? `"${this.props.defaultCorsPreflightOptions.allowMethods.join(',')}"`
      : '"OPTIONS,GET,PUT,POST,DELETE"';
    this.allowedHeaders = this.props.defaultCorsPreflightOptions?.allowHeaders
      ? `"${this.props.defaultCorsPreflightOptions.allowHeaders.join(',')}"`
      : '"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent"';

    this.addGatewayResponses();

    if (props.userPool) {
      this.attachCognitoAuthorizer(props.userPool);
    }
  }

  public attachCognitoAuthorizer(userPool: IUserPool) {
    this.authorizer = new CognitoUserPoolsAuthorizer(this, 'CognitoAuthorizer', {
      cognitoUserPools: [userPool],
      authorizerName: 'Cognito'
    });
    this.authorizer._attachToApi(this.api);
  }

  public addLambda({
    method,
    path,
    lambda,
    options = {}
  }: {
    method: HttpMethod;
    path: string;
    lambda: Lambda;
    options?: Mutable<IntegrationOptions & MethodOptions>;
  }) {
    const resource = this.api.root.resourceForPath(path.startsWith('/') ? path : `/${path}`);

    const _options = options;
    if (this.authorizer && method !== 'OPTIONS') {
      _options.authorizer = this.authorizer;
    }
    const integration = new AwsIntegration({
      proxy: true,
      service: 'lambda',
      path: `2015-03-31/functions/${lambda.functionArn}/invocations`,
      options
    });
    resource.addMethod(method, integration, options);
    lambda.grantInvoke(new ServicePrincipal('apigateway.amazonaws.com')); //Need to grant apigateway permission to invoke lambda when there are multiple stages

    try {
      this.addCorsMockIntegration(resource); // throws if added multiple times
    } catch {
      // Allow multiple resources of the same name with different methods
    }
  }

  private addGatewayResponses() {
    const defaultResponses: GatewayResponseOptions[] = [
      { type: ResponseType.UNAUTHORIZED, statusCode: '401' },
      { type: ResponseType.ACCESS_DENIED, statusCode: '403' },
      { type: ResponseType.RESOURCE_NOT_FOUND, statusCode: '404' },
      { type: ResponseType.DEFAULT_5XX, statusCode: '500' }
    ];
    const responses = [...defaultResponses, ...(this.props.gatewayResponses || [])];

    for (const { type, statusCode } of responses) {
      (this.api as RestApi).addGatewayResponse(
        toPascal(`${this.props.prefix}-GatewayResponse-${type.responseType}`),
        {
          type,
          statusCode,
          responseHeaders: {
            'Access-Control-Allow-Methods': this.allowedMethods,
            'Access-Control-Allow-Origin': this.allowedOrigins,
            'Access-Control-Allow-Headers': this.allowedHeaders
          }
        }
      );
    }
  }

  private addCorsMockIntegration(apiResource: IResource) {
    // TODO: verify how this mock synth's with different props
    const integrationOptions: IntegrationOptions = {
      integrationResponses: [
        {
          statusCode: '204',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Headers': this.allowedHeaders,
            'method.response.header.Access-Control-Allow-Origin': this.allowedOrigins,
            'method.response.header.Access-Control-Allow-Methods': this.allowedMethods,
            'method.response.header.Access-Control-Allow-Credentials': this.props
              .defaultCorsPreflightOptions?.allowCredentials
              ? '"true"'
              : '"false"'
          }
        }
      ],
      passthroughBehavior: PassthroughBehavior.NEVER,
      requestTemplates: {
        'application/json': '{"statusCode": 200}'
      }
    };
    const methodOptions: MethodOptions = {
      methodResponses: [
        {
          statusCode: '204',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Headers': true,
            'method.response.header.Access-Control-Allow-Methods': true,
            'method.response.header.Access-Control-Allow-Origin': true
          }
        }
      ]
    };
    if (this.props.defaultCorsPreflightOptions?.allowCredentials) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (methodOptions as any).methodResponses[0].responseParameters[
        'method.response.header.Access-Control-Allow-Credentials'
      ] = true;
    }

    apiResource.addMethod('OPTIONS', new MockIntegration(integrationOptions), methodOptions);
  }
}
