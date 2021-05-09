import {
  CognitoUserPoolsAuthorizer,
  Cors,
  CorsOptions as BaseCorsOptions,
  Deployment,
  DeploymentProps,
  GatewayResponseOptions,
  LambdaIntegration,
  LambdaIntegrationOptions,
  MethodOptions,
  ResponseType,
  RestApi,
  RestApiProps,
  Stage,
  StageProps
} from '@aws-cdk/aws-apigateway';
import { Function as Lambda } from '@aws-cdk/aws-lambda';
import { Role, IRole, ServicePrincipal } from '@aws-cdk/aws-iam';
import { Construct } from '@aws-cdk/core';
import { BaseConstruct, BaseConstructProps } from './BaseConstruct';
import { Lambdas } from './Lambdas';
import { UserPool } from '@aws-cdk/aws-cognito';
import { Mutable } from '../../lib/Mutable';

const methods = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'] as const;
type Method = typeof methods[number];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isMethod(value: any): value is Method {
  return typeof value === 'string' && !!methods.find(method => method === value.toUpperCase());
}
export interface ApiEvent {
  method: Method;
  path: string;
  options?: Mutable<MethodOptions & LambdaIntegrationOptions>;
}
export interface ApiConfig extends ApiEvent {
  lambda: Lambda;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isApiEvent(event: any): event is ApiEvent {
  if (typeof event !== 'object') {
    return false;
  }
  for (const [key, value] of Object.entries(event)) {
    switch (key) {
      case 'method':
        if (!isMethod(value)) {
          throw new Error(`${value} is not a valid METHOD`);
        }
        break;
      case 'path':
        if (typeof value === 'string' && value.startsWith('/')) {
          break;
        }
        throw new Error('ApiEvent paths must be of type string and start with a "/"');
      default:
        return false;
    }
  }
  return true;
}

interface CorsOptions extends BaseCorsOptions {
  allowOrigins: string[];
}

export interface ApiProps
  extends BaseConstructProps,
    Omit<RestApiProps, 'defaultCorsPreflightOptions'>,
    Omit<DeploymentProps, 'api'>,
    Omit<StageProps, 'deployment'> {
  // Api service role for lambda execution
  lambdas: Lambdas;
  stage: string;
  role?: IRole;
  userPool?: UserPool;
  gatewayResponses?: GatewayResponseOptions[];
  cors: CorsOptions;
}

export class Api extends BaseConstruct {
  public restApi: RestApi;
  private serviceRole: IRole;
  private userPool?: UserPool;

  constructor(scope: Construct, id: string, props: ApiProps) {
    super(scope, id, props);
    this.serviceRole =
      props.role ??
      new Role(this, 'ApiServiceRole', {
        roleName: `${this.prefix}-api-execution`,
        assumedBy: new ServicePrincipal('apigateway.amazonaws.com')
      });
    const allowHeaders = [
      ...new Set([
        ...(props.cors.allowHeaders ?? []),
        'Authorization',
        'X-Api-Key',
        'X-Amz-Date',
        'X-Amz-Security-Token',
        'Content-Type'
      ])
    ];
    this.restApi = new RestApi(this, 'RestApi', {
      ...props,
      restApiName: this.prefix,
      defaultCorsPreflightOptions: {
        allowHeaders,
        statusCode: props.cors.statusCode ?? 200,
        allowOrigins: props.cors.allowOrigins ?? Cors.ALL_ORIGINS,
        allowMethods: props.cors.allowMethods ?? Cors.ALL_METHODS
      }
    });
    const deployment = new Deployment(this, 'Deployment', {
      ...props,
      api: this.restApi
    });
    new Stage(this, 'Stage', {
      ...props,
      stageName: props.stage,
      deployment
    });

    if (!props.lambdas.apiConfig) {
      throw new Error('attempting to build an api without a lambdas.apiConfig');
    }
    for (const resource of Object.values(props.lambdas.apiConfig)) {
      this.addResource(resource);
    }

    this.configureGatewayResponses(props.gatewayResponses);
  }

  addResource({ lambda, method, path, options = {} }: ApiConfig) {
    const resource = this.restApi.root.resourceForPath(path);
    if (this.userPool && method !== 'OPTIONS') {
      options.authorizer =
        options.authorizer ??
        new CognitoUserPoolsAuthorizer(this, 'UserPoolAuthorizer', {
          cognitoUserPools: [this.userPool]
        });
    }
    resource.addMethod(method, new LambdaIntegration(lambda, options), options);
    lambda.grantInvoke(this.serviceRole);
  }

  configureGatewayResponses(gatewayResponses: GatewayResponseOptions[] = []) {
    const defaultResponses: GatewayResponseOptions[] = [
      { type: ResponseType.UNAUTHORIZED, statusCode: '401' },
      { type: ResponseType.ACCESS_DENIED, statusCode: '403' },
      { type: ResponseType.RESOURCE_NOT_FOUND, statusCode: '404' },
      { type: ResponseType.DEFAULT_5XX, statusCode: '500' }
    ];
    for (const response of defaultResponses) {
      // look in gatewayResponses argument to not have duplication and to favor
      // one user submitted over the defaults
      const inArgument = gatewayResponses.find(
        ({ type: { responseType } }) => responseType === response.type.responseType
      );
      if (!inArgument) {
        this.restApi.addGatewayResponse(`${response.type.responseType}GatewayResponse`, response);
      }
    }
    for (const response of gatewayResponses) {
      this.restApi.addGatewayResponse(`${response.type.responseType}GatewayResponse`, response);
    }
  }
}
