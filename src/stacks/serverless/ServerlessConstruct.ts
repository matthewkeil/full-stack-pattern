import { App, Construct, CustomResource, Duration, Environment, Fn } from '@aws-cdk/core';
import { Function as Lambda } from '@aws-cdk/aws-lambda';
import express from 'express';
import { Role, ServicePrincipal } from '@aws-cdk/aws-iam';
import { Lambdas, LambdasProps, LambdaProps } from '../../constructs/Lambdas';
import { Tables, TablesProps } from '../../constructs/Tables';
import { Api, ApiProps } from '../../constructs/Api';
import { BaseConstruct, BaseConstructProps } from '../../constructs/BaseConstruct';
import { CDNStack } from '../cdn/CDNStack';
import { CDNNestedStack } from '../cdn/CDNNestedStack';
import { CognitoStack } from '../cognito/CognitoStack';
import { CognitoNestedStack } from '../cognito/CognitoNestedStack';
import { resolve } from 'path';

const SERVICE_TOKEN_NAME = 'custom-resource';
export interface ServerlessConstructProps
  extends BaseConstructProps,
    Omit<TablesProps, 'tables'>,
    Omit<LambdasProps, 'tables'>,
    Omit<ApiProps, 'lambdas' | 'userPool'> {
  frontend?: CDNStack | CDNNestedStack;
  tables?: TablesProps['tables'];
  auth?: CognitoStack | CognitoNestedStack;
  configFile?: object;
  env: Required<Environment>;
}

export class ServerlessConstruct extends BaseConstruct {
  public lambdas: Lambdas;
  public tables?: Tables;
  public api?: Api;
  public serviceToken?: Lambda;

  constructor(scope: Construct, id: string, private props: ServerlessConstructProps) {
    super(scope, id, props);

    const serviceTokenRole = new Role(this, 'ServiceTokenRole', {
      roleName: `${props.prefix}-${SERVICE_TOKEN_NAME}`,
      assumedBy: new ServicePrincipal('lambda.amazonaws.com')
    });
    const serviceToken: LambdaProps = {
      functionName: SERVICE_TOKEN_NAME,
      handler: 'index.handler',
      timeout: Duration.seconds(15),
      code: resolve(__dirname, '..', '..', '..', 'providers', 'configFileProvider'),
      role: serviceTokenRole
    };
    if (props.frontend) {
      props.frontend.bucket.grantReadWrite(serviceTokenRole);
    }

    if (props.tables) {
      this.tables = new Tables(this, 'Tables', (props as unknown) as TablesProps);
    }
    this.lambdas = new Lambdas(this, 'Lambdas', {
      ...props,
      lambdas: [...props.lambdas, serviceToken],
      tables: this.tables
    });
    this.serviceToken = this.lambdas.resources[SERVICE_TOKEN_NAME]?.lambda;
    if (this.lambdas.apiConfig) {
      this.api = new Api(this, 'Api', {
        ...props,
        lambdas: this.lambdas,
        userPool: props.auth?.userPool
      });
    }

    if (props.configFile || props.auth || this.api) {
      let config: object = {
        ...(props.configFile || {}),
        region: props.env.region
      };
      if (this.api) {
        config = {
          ...config,
          backendUrl: this.api.restApi.url
        };
      }
      if (props.auth) {
        config = {
          ...config,
          userPool: props.auth.userPool.userPoolId,
          userPoolClient: props.auth.userPoolClient.userPoolClientId,
          identityPool: props.auth.identityPool.ref
        };
      }
      if (props.frontend) {
        const configFile = new CustomResource(this, 'ConfigFile', {
          serviceToken: this.serviceToken.functionArn,
          resourceType: 'Custom::ConfigFile',
          properties: {
            config,
            fileType: 'js',
            targetBucketName: props.frontend.bucket.bucketName,
            timestamps: Date.now()
          }
        });
        configFile.node.addDependency(this.serviceToken);
        const netlifyConfig = new CustomResource(this, 'AdminConfigFile', {
          serviceToken: this.serviceToken.functionArn,
          resourceType: 'Custom::ConfigFile',
          properties: {
            config: {
              backend: { baseUrl: Fn.join('/', [this.api?.restApi.url ?? '', 'netlify']) }
            },
            fileType: 'yaml',
            fileName: 'admin/config.yml',
            targetBucketName: props.frontend.bucket.bucketName,
            timestamps: Date.now()
          }
        });
        netlifyConfig.node.addDependency(this.serviceToken);
      }
    }
  }

}
