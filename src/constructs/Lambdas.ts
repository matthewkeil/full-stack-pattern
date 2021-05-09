import {
  AssetCode,
  Function as Lambda,
  FunctionProps,
  IEventSource,
  LayerVersion,
  LayerVersionProps,
  Runtime
} from '@aws-cdk/aws-lambda';
import { LogGroup, LogGroupProps } from '@aws-cdk/aws-logs';
import { IRole, Role, Policy, PolicyStatement, Effect, ServicePrincipal } from '@aws-cdk/aws-iam';
import { BaseConstruct, BaseConstructProps } from './BaseConstruct';
import { Construct, RemovalPolicy } from '@aws-cdk/core';
import { Tables } from './Tables';
import { toKebab, toPascal, toUpperSnake } from '../../lib/changeCase';
import { ApiConfig, ApiEvent, isApiEvent } from './Api';
import { mergeProps } from '../../lib/mergeProps';

interface TableDetail {
  tableName: string;
  read?: boolean;
  write?: boolean;
}

type LambdaLayer = string | LayerVersionProps;
export interface LambdaProps
  extends Omit<FunctionProps, 'code' | 'runtime' | 'events' | 'layers' | 'role'>,
    LogGroupProps {
  functionName: string;
  role?: IRole;
  policyStatements?: PolicyStatement[];
  tables?: (string | TableDetail)[];
  code?: string | AssetCode;
  layers?: LambdaLayer[];
  runtime?: FunctionProps['runtime'];
  canInvoke?: IRole[];
  events?: (ApiEvent | IEventSource)[];
}
const omittedLambdaProps = [
  'functionName',
  'logGroupName',
  'description',
  'tables',
  'handler'
] as const;
type OmittedLambdaProps = typeof omittedLambdaProps[number];
export interface LambdasProps extends BaseConstructProps, Omit<LambdaProps, OmittedLambdaProps> {
  lambdas: LambdaProps[];
  tables?: Tables;
}
export interface ResourceGroup {
  lambda: Lambda;
  logGroup: LogGroup;
  role: IRole;
}

export class Lambdas extends BaseConstruct {
  public resources: { [functionName: string]: ResourceGroup } = {};
  public apiConfig?: { [functionName: string]: ApiConfig };
  private tables?: Tables['tables'];
  private code?: AssetCode;
  private layers: LayerVersion[];

  constructor(scope: Construct, id: string, private props: LambdasProps) {
    super(scope, id, props);
    this.tables = props.tables?.tables;
    if (props.code) {
      this.code = typeof props.code === 'string' ? new AssetCode(props.code) : props.code;
    }
    this.layers = props.layers?.length ? props.layers.map(this.mapToLayerVersion) : [];
    for (const lambda of props.lambdas) {
      this.buildResources(lambda);
    }
  }

  buildResources(props: LambdaProps) {
    const functionName = `${this.prefix}-${props.functionName}`.substr(0, 64);
    const role = this.buildRole({
      role: props.role ?? this.props.role,
      props,
      functionName
    });

    const logGroupRemovalPolicy = props.removalPolicy ?? this.props.removalPolicy;
    const logGroup = new LogGroup(
      this,
      `${toPascal(props.logGroupName ?? props.functionName)}LogGroup`,
      {
        ...mergeProps(this.props, props),
        logGroupName: `/aws/lambda/${functionName}`,
        retention: props.retention ?? this.props.retention,
        encryptionKey: props.encryptionKey ?? this.props.encryptionKey,
        /* eslint-disable indent */
        removalPolicy: logGroupRemovalPolicy
          ? logGroupRemovalPolicy
          : this.prod
          ? RemovalPolicy.RETAIN
          : RemovalPolicy.DESTROY
        /* eslint-enable indent */
      }
    );

    /* eslint-disable indent */
    const code = !props.code
      ? this.code
      : typeof props.code === 'string'
      ? new AssetCode(props.code)
      : props.code;
    /* eslint-enable indent */
    if (!code) {
      throw new Error(`no code provided for function ${props.functionName}`);
    }
    const lambda = new Lambda(this, `${toPascal(props.functionName)}Lambda`, {
      ...mergeProps(this.props, props),
      code,
      role,
      functionName,
      runtime: props.runtime ?? this.props.runtime ?? Runtime.NODEJS_14_X,
      events: undefined,
      layers: undefined
    });

    this.configureFunction({ props, lambda, role, logGroup });
    this.resources[props.functionName] = {
      lambda,
      logGroup,
      role
    };
  }

  private buildRole({
    functionName,
    props,
    role
  }: {
    role?: IRole;
    functionName: string;
    props: LambdaProps;
  }): IRole {
    const truncatedName = functionName.substr(0, 64);
    const _role =
      role ??
      new Role(this, `${toPascal(props.functionName)}Role`, {
        roleName: truncatedName,
        assumedBy: new ServicePrincipal('lambda.amazonaws.com')
      });

    if (props.policyStatements?.length) {
      props.policyStatements.forEach(statement => _role.addToPrincipalPolicy(statement));
    }

    if (props.vpc) {
      _role.addToPrincipalPolicy(
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: [
            'ec2:CreateNetworkInterface',
            'ec2:DescribeNetworkInterfaces',
            'ec2:DeleteNetworkInterface',
            'ec2:AssignPrivateIpAddresses',
            'ec2:UnassignPrivateIpAddresses'
          ],
          resources: ['*']
        })
      );
    }

    return _role;
  }

  private configureFunction({
    props,
    logGroup,
    lambda,
    role
  }: {
    props: LambdaProps;
    logGroup: LogGroup;
    lambda: Lambda;
    role: IRole;
  }) {
    logGroup.grantWrite(role);
    lambda.node.addDependency(role);

    const canInvoke = [...(props.canInvoke || []), ...(this.props.canInvoke || [])];
    if (canInvoke.length) {
      for (const invokeRole of canInvoke) {
        invokeRole.attachInlinePolicy(
          new Policy(this, toPascal(`${invokeRole.roleName}-${props.functionName}`), {
            statements: [
              new PolicyStatement({
                effect: Effect.ALLOW,
                actions: ['lambda:InvokeFunction'],
                resources: [lambda.functionArn]
              })
            ]
          })
        );
      }
    }

    const layers = this.layers.concat(...(props.layers ?? []).map(this.mapToLayerVersion));
    for (const layer of layers) {
      lambda.addLayers(layer);
    }

    if (props.tables?.length) {
      if (!this.tables) {
        throw new Error('no Tables passed to Lambdas');
      }
      for (const nameOrDetail of props.tables) {
        const name = typeof nameOrDetail === 'string' ? nameOrDetail : nameOrDetail.tableName;
        if (!this.tables[name]) {
          throw new Error(
            `failed adding table privileges for function ${props.functionName}.\ntable ${name} doesn't exist`
          );
        }

        /* eslint-disable indent */
        props.tables.length === 1
          ? lambda.addEnvironment('TABLE_NAME', this.tables[name].tableName)
          : lambda.addEnvironment(
              `${toUpperSnake(this.tables[name].tableName)}_TABLE_NAME`,
              this.tables[name].tableName
            );
        /* eslint-enable indent */

        if (typeof nameOrDetail === 'string') {
          this.tables[name].grantReadWriteData(lambda);
          continue;
        }
        const { read, write } = nameOrDetail;
        if (read) {
          this.tables[name].grantReadData(lambda);
        }
        if (write) {
          this.tables[name].grantWriteData(lambda);
        }
      }
    }

    if (props.events?.length) {
      for (const event of props.events) {
        if (isApiEvent(event)) {
          if (!this.apiConfig) {
            this.apiConfig = {};
          }
          this.apiConfig[props.functionName] = {
            lambda,
            method: event.method,
            path: event.path
          };
          continue;
        }
        lambda.addEventSource(event);
      }
    }
  }

  private mapToLayerVersion = (layer: LambdaLayer, index: number) => {
    const id = `${toPascal(this.prefix)}Layer${index}`;
    const layerProps: LayerVersionProps =
      typeof layer === 'string'
        ? { layerVersionName: toKebab(id), code: new AssetCode(layer) }
        : layer;
    return new LayerVersion(this, id, { removalPolicy: RemovalPolicy.DESTROY, ...layerProps });
  };
}
