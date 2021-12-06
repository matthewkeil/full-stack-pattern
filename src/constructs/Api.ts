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
  AwsIntegration,
  CfnRestApi
} from '@aws-cdk/aws-apigateway';
import { Construct, Stack } from '@aws-cdk/core';
import { IUserPool } from '@aws-cdk/aws-cognito';
import { ServicePrincipal } from '@aws-cdk/aws-iam';
import { AssetCode } from '@aws-cdk/aws-lambda';
import { addToDevServer } from 'convert-lambda-to-express';

import { Mutable, toPascal, toKebab, HttpMethod } from '../../lib';
import { Lambda } from './Lambda';

export interface ApiProps extends Mutable<Omit<RestApiProps, 'restApiName'>> {
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

export class Api extends Construct {
  public api: RestApi;

  private allowedOrigins: string;
  private allowedMethods: string;
  private allowedHeaders: string;
  private authorizer?: CognitoUserPoolsAuthorizer;
  private pascalName: string;
  private kebabName: string;
  private buildDevServer: boolean;

  constructor(scope: Construct, id: string, private props: ApiProps = {}) {
    super(scope, id);
    this.buildDevServer = props.buildDevServer ?? true;

    this.kebabName = toKebab(
      this.props.name && this.props.prefix
        ? `${this.props.prefix}-${this.props.name}`
        : this.props.name?.length
        ? this.props.name
        : this.props.prefix?.length
        ? this.props.prefix
        : ''
    );
    if (!this.kebabName.length) {
      throw new Error('Api requires props.name or props.prefix');
    }
    this.pascalName = toPascal(this.kebabName);

    this.api = new RestApi(this, this.pascalName, {
      ...this.props,
      defaultCorsPreflightOptions: undefined,
      restApiName: this.kebabName,
      deployOptions: {
        ...(this.props.deployOptions ?? {}),
        stageName: this.props.deployOptions?.stageName ?? props.stage
      }
    });
    if (this.props.dontOverrideLogicalId !== true) {
      (this.api.node.defaultChild as CfnRestApi).overrideLogicalId(
        this.props.logicalId ? this.props.logicalId : `${this.pascalName}Api`
      );
    }

    this.allowedOrigins = this.props.defaultCorsPreflightOptions?.allowOrigins
      ? `"${this.props.defaultCorsPreflightOptions.allowOrigins.join(',')}"`
      : '"*"';
    this.allowedMethods = this.props.defaultCorsPreflightOptions?.allowMethods
      ? `"${this.props.defaultCorsPreflightOptions.allowMethods.join(',')}"`
      : '"OPTIONS,GET,PUT,POST,PATCH,DELETE"';
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
      path: `2015-03-31/functions/${lambda.function.functionArn}/invocations`,
      options
    });
    resource.addMethod(method, integration, options);
    lambda.function.grantInvoke(new ServicePrincipal('apigateway.amazonaws.com')); //Need to grant apigateway permission to invoke lambda when there are multiple stages

    try {
      this.addCorsMockIntegration(resource); // throws if added multiple times
    } catch {
      // Allow multiple resources of the same name with different methods
    }

    if (this.buildDevServer) {
      addToDevServer({
        functionName: lambda.function.functionName,
        memorySize: lambda.props.memorySize,
        resourcePath: path,
        method,
        handler: lambda.props.handler,
        timeoutInSeconds: lambda.props.timeout?.toSeconds(),
        region: Stack.of(this).region,
        accountId: Stack.of(this).account,
        codeDirectory: lambda.code instanceof AssetCode ? lambda.code.path : undefined,
        environment: lambda.props.environment
      });
    }
  }

  private addGatewayResponses() {
    const responses: Map<
      GatewayResponseOptions['type'],
      Omit<GatewayResponseOptions, 'type'>
    > = new Map([
      [ResponseType.UNAUTHORIZED, { statusCode: '401' }],
      [ResponseType.ACCESS_DENIED, { statusCode: '403' }],
      [ResponseType.RESOURCE_NOT_FOUND, { statusCode: '404' }],
      [ResponseType.DEFAULT_5XX, { statusCode: '500' }]
    ]);

    for (const { type, responseHeaders, statusCode, templates } of this.props.gatewayResponses ??
      []) {
      responses.set(type, { responseHeaders, statusCode, templates });
    }

    for (const [type, { statusCode, responseHeaders, templates }] of responses.entries()) {
      this.api.addGatewayResponse(
        `${this.pascalName}GatewayResponse${toPascal(type.responseType)}`,
        {
          type,
          statusCode,
          templates,
          responseHeaders: responseHeaders ?? {
            'Access-Control-Allow-Methods': this.allowedMethods,
            'Access-Control-Allow-Origin': this.allowedOrigins,
            'Access-Control-Allow-Headers': this.allowedHeaders,
            'Access-Control-Allow-Credentials': this.props.defaultCorsPreflightOptions
              ?.allowCredentials
              ? '"true"'
              : '"false"'
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
