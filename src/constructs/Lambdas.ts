import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import {
  AssetCode,
  Function as Lambda,
  FunctionProps,
  IEventSource,
  LayerVersion,
  LayerVersionProps,
  Runtime
} from '@aws-cdk/aws-lambda';
import { Construct, RemovalPolicy } from '@aws-cdk/core';
import { ILogGroup, LogGroup, LogGroupProps } from '@aws-cdk/aws-logs';
import { IRole, Role, Policy, PolicyStatement, Effect, ServicePrincipal } from '@aws-cdk/aws-iam';
import express from 'express';
import { BaseConstruct, BaseConstructProps } from './BaseConstruct';
import { Tables } from './Tables';
import { toKebab, toPascal, toUpperSnake } from '../../lib/changeCase';
import { ApiConfig, ApiEvent, isApiEvent, isMethod, Method } from './Api';
import { mergeProps } from '../../lib/mergeProps';
import { resolve, sep } from 'path';
import { wrapLambda } from '../../lib/wrapLambda';

interface TableDetail {
  tableName: string;
  read?: boolean;
  write?: boolean;
}

type LambdaLayer = string | LayerVersionProps;
export interface LambdaProps
  extends Omit<FunctionProps, 'code' | 'runtime' | 'events' | 'layers' | 'role' | 'environment'>,
    LogGroupProps {
  functionName: string;
  role?: IRole;
  environment?: Record<string, string | (() => string)>;
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
  existingLogGroups?: string[];
}
export interface ResourceGroup {
  lambda: Lambda;
  logGroup: ILogGroup;
  role: IRole;
}

export class Lambdas extends BaseConstruct {
  public resources: { [functionName: string]: ResourceGroup } = {};
  public apiConfig?: { [functionName: string]: ApiConfig & { code: AssetCode } };
  private devServerConfig?: {
    method: Method;
    path: string;
    environment: LambdaProps['environment'];
    propName: string;
    filePath: string;
  }[];

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

  public getDevServer(devServer?: {
    logger?: false | string;
    cors?: cors.CorsOptions;
    helmet?: Record<string, unknown>;
    middleware?: express.Handler[];
  }): express.Express {
    if (!this.devServerConfig) {
      throw new Error('no handlers configured');
    }

    const app = express();
    const environment: Record<string, string> = {};

    if (devServer?.logger !== false && devServer?.logger !== 'false') {
      app.use(morgan(devServer?.logger ?? this.prod ? 'combined' : 'dev'));
    }
    app.use(
      cors({
        origin: '*',
        methods: '*',
        ...(devServer?.cors ?? {})
      })
    );
    app.use(morgan(devServer?.logger ?? this.prod ? 'combined' : 'dev'));
    if (devServer?.middleware?.length) {
      devServer.middleware.forEach(handler => app.use(handler));
    }

    for (const { method, path, environment, filePath, propName } of this.devServerConfig) {
      if (!isMethod(method)) {
        throw new Error(`${method} is not a valid method`);
      }
      if (environment) {
        for (const [key, value] of Object.entries(environment)) {
          const _value = typeof value === 'function' ? value() : value;
          if (!_value.length) {
            throw new Error(`attempting to load devServer env ${key} with "${_value}"`);
          }
          environment[key] = _value;
        }
      }

      if (require.cache[filePath]) {
        delete require.cache[filePath];
      }
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const lambdaHandler = require(filePath)[propName];
      app[method](path, wrapLambda(lambdaHandler));

      console.log({
        method,
        path,
        filePath
      });
    }

    for (const [key, value] of Object.entries(environment)) {
      console.log('loading env key ' + key);
      process.env[key] = value;
    }

    return app;
  }

  private buildResources(props: LambdaProps) {
    const functionName = `${this.prefix}-${props.functionName}`.substr(0, 64);
    const role = this.buildRole({
      role: props.role ?? this.props.role,
      props,
      functionName
    });

    const logGroupLogicalId = `${toPascal(props.logGroupName ?? props.functionName)}LogGroup`;
    const logGroupName = `/aws/lambda/${functionName}`;
    let logGroup: ILogGroup;
    if (this.props.existingLogGroups?.find(name => name === logGroupName)) {
      logGroup = LogGroup.fromLogGroupName(this, logGroupLogicalId, logGroupName);
    } else {
      const logGroupRemovalPolicy = props.removalPolicy ?? this.props.removalPolicy;
      logGroup = new LogGroup(this, logGroupLogicalId, {
        ...mergeProps(this.props, props),
        logGroupName,
        retention: props.retention ?? this.props.retention,
        encryptionKey: props.encryptionKey ?? this.props.encryptionKey,
        /* eslint-disable indent */
        removalPolicy: logGroupRemovalPolicy
          ? logGroupRemovalPolicy
          : this.prod
          ? RemovalPolicy.RETAIN
          : RemovalPolicy.DESTROY
        /* eslint-enable indent */
      });
    }

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
    const merged = mergeProps(this.props, props);
    const environment: Record<string, string> = {};
    for (const [key, value] of Object.entries(merged.environment ?? {})) {
      environment[key] = typeof value === 'function' ? value() : value;
    }
    const lambda = new Lambda(this, `${toPascal(props.functionName)}Lambda`, {
      ...merged,
      environment,
      code,
      role,
      functionName,
      runtime: props.runtime ?? this.props.runtime ?? Runtime.NODEJS_14_X,
      events: undefined,
      layers: undefined
    });

    this.configureFunction({ props, lambda, role, logGroup, code });
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
    code,
    role
  }: {
    logGroup: ILogGroup;
    lambda: Lambda;
    role: IRole;
    props: LambdaProps;
    code: AssetCode;
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
          const handler = this.getHandler({ props, code });
          if (handler) {
            if (!this.devServerConfig) {
              this.devServerConfig = [];
            }
            this.devServerConfig.push({
              method: event.method,
              path: event.path,
              environment: props.environment,
              filePath: handler.filePath,
              propName: handler.propName
            });
          }
          if (!this.apiConfig) {
            this.apiConfig = {};
          }
          this.apiConfig[props.functionName] = {
            lambda,
            code,
            ...event
          };
          continue;
        }
        lambda.addEventSource(event);
      }
    }
  }

  private getHandler({ props, code }: { props: LambdaProps; code: AssetCode }) {
    try {
      const handlerSegments = props.handler.split('/');
      const [filename, propName] = handlerSegments.pop()?.split('.') as string[];
      const pathSegments = code.path.split(sep).concat([...handlerSegments, filename]);
      const filePath = require.resolve(resolve('/', ...pathSegments));
      return { filePath, propName };
    } catch (err) {
      console.error(err);
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
