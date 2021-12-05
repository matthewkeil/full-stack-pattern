import { nanoid } from 'nanoid';
import { addToDevServer } from 'convert-lambda-to-express';
import { Stack, Construct, RemovalPolicy } from '@aws-cdk/core';
import { ITable } from '@aws-cdk/aws-dynamodb';
import { Rule, RuleTargetInput } from '@aws-cdk/aws-events';
import { LambdaFunction } from '@aws-cdk/aws-events-targets';
import { LambdaIntegrationOptions, MethodOptions } from '@aws-cdk/aws-apigateway';
import { LogGroup, LogGroupProps, RetentionDays, CfnLogGroup, ILogGroup } from '@aws-cdk/aws-logs';
import {
  IRole,
  Role,
  CfnRole,
  RoleProps,
  PrincipalBase,
  ServicePrincipal,
  Policy,
  PolicyProps,
  CfnPolicy,
  PolicyStatement,
  ArnPrincipal,
  Effect
} from '@aws-cdk/aws-iam';
import {
  Function as BaseLambda,
  FunctionProps,
  CfnFunction,
  Permission,
  Code,
  AssetCode,
  IEventSource,
  Runtime,
  LayerVersion
} from '@aws-cdk/aws-lambda';

import { HttpMethod, isHttpMethod, LogLevel, Mutable, toKebab, toPascal, toEnv } from '../../lib';
import { Api } from './Api';
import { Tables } from './Tables';

export interface ApiEvent {
  method: HttpMethod;
  path: string;
  options?: Mutable<MethodOptions & LambdaIntegrationOptions>;
}
function isApiEvent(obj: unknown): obj is ApiEvent {
  const baseIsTrue =
    typeof obj === 'object' &&
    obj !== null &&
    'path' in obj &&
    'method' in obj &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isHttpMethod((obj as any).method) &&
    Object.keys(obj).length <= 3;
  if (!baseIsTrue) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((obj as any).options) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return typeof (obj as any).options === 'object' && (obj as any).options !== null;
  }
  return true;
}

export interface LambdaProps
  extends Mutable<
      Omit<FunctionProps, 'functionName' | 'role' | 'code' | 'events' | 'runtime' | 'layers'>
    >,
    Mutable<Omit<RoleProps, 'roleName' | 'assumedBy'>>,
    Mutable<Omit<PolicyProps, 'policyName' | 'roles'>>,
    Mutable<Omit<LogGroupProps, 'logGroupName'>> {
  name: string;
  dontOverrideLogicalId?: boolean;
  code?: string | Code;
  layers?: (LayerVersion | string)[];
  runtime?: Runtime;
  prefix?: string;
  role?: IRole | string;
  loggingLevel?: LogLevel;
  canInvoke?: Array<PrincipalBase | IRole | string>;
  warmingEvent?: Rule;
  api?: Api;
  events?: (IEventSource | ApiEvent)[];
  buildDevServer?: boolean;
  existingLogGroups?: string[];

  /**
   *
   * @description To add a table to the function, either provide:
   *
   * `table: Table` OR `table: string and tables: DynamoTables`
   *
   * When using table as a string will pull the table named the same as the string and associate that with the function.
   * Supports for backwards compatibility with LambdasAndLogGroups.
   *
   */
  table?: ITable | string;
  tables?: Tables;
  tableEnvKey?: string;
}

/**
 * Creates and configures
 */
export class Lambda extends Construct {
  public function: BaseLambda;
  public logGroup: ILogGroup;
  public role!: IRole;
  public policy?: Policy;
  public api?: Api;

  private pascalName: string;
  private kebabName: string;
  private code: Code;
  private buildDevServer: boolean;

  constructor(scope: Construct, id: string, protected props: LambdaProps) {
    super(scope, id);
    const name = props.prefix ? `${props.prefix}-${props.name}` : props.name;
    this.pascalName = toPascal(name);
    this.kebabName = toKebab(name).substr(0, 64);

    const code = typeof props.code === 'string' ? new AssetCode(props.code) : props.code;
    if (!code) {
      throw new Error('Must provide either code or asset');
    }
    this.code = code;
    this.buildDevServer = props.buildDevServer ?? this.code instanceof AssetCode;
    const runtime = props.runtime;
    if (!runtime) {
      throw new Error('Must provide runtime');
    }

    const logGroupName = `/aws/lambda/${this.kebabName}`;
    if (this.props.existingLogGroups?.find(name => name === logGroupName)) {
      this.logGroup = LogGroup.fromLogGroupName(this, 'LogGroup', logGroupName);
    } else {
      this.logGroup = new LogGroup(this, 'LogGroup', {
        ...this.props,
        logGroupName,
        removalPolicy: props.removalPolicy ?? RemovalPolicy.DESTROY,
        retention: props.logRetention ?? RetentionDays.TWO_WEEKS
      });
      if (this.props.dontOverrideLogicalId !== true) {
        (this.logGroup.node.defaultChild as CfnLogGroup).overrideLogicalId(
          `${this.pascalName}LogGroup`
        );
      }
    }

    this._buildIam();

    const layers: LayerVersion[] = [];
    if (this.props.layers) {
      for (const layer of this.props.layers) {
        if (layer instanceof LayerVersion) {
          layers.push(layer);
        } else {
          layers.push(
            new LayerVersion(this, `Layer${nanoid()}`, {
              code: new AssetCode(layer)
            })
          );
        }
      }
    }

    this.function = new BaseLambda(this, 'Function', {
      ...props,
      events: undefined,
      layers,
      code,
      runtime,
      functionName: this.kebabName,
      role: this.role
    });
    if (this.props.dontOverrideLogicalId !== true) {
      (this.function.node.defaultChild as CfnFunction).overrideLogicalId(
        `${this.pascalName}Function`
      );
    }
    if (this.policy) {
      this.function.node.addDependency(this.policy);
    }
    if (props.removalPolicy) {
      this.function.applyRemovalPolicy(props.removalPolicy);
    }

    if (props.loggingLevel) {
      this.function.addEnvironment('LOGGING_LEVEL', props.loggingLevel);
    }

    if (props.table) {
      this.associateTable({
        table: props.table,
        tables: props.tables,
        tableEnvKey: props.tableEnvKey
      });
    }

    if (props.warmingEvent) {
      this.addWarmingEvent(props.warmingEvent);
    }

    if (props.events) {
      const { events, apiEvents } = this._filterApiEvents(props.events);
      for (const event of events) {
        this.function.addEventSource(event);
      }
      for (const event of apiEvents) {
        this.addApiEvent(event);
      }
    }

    if (props.canInvoke?.length) {
      for (const invoker of props.canInvoke) {
        if (invoker instanceof PrincipalBase || typeof invoker === 'string') {
          this.addPermission(invoker);
        } else {
          this.addPermission(invoker.roleArn);
        }
      }
    }
  }

  public addPermission(
    principalOrArn: PrincipalBase | string,
    permission: Partial<Permission> = {}
  ) {
    const _principal =
      typeof principalOrArn === 'string' ? new ArnPrincipal(principalOrArn) : principalOrArn;
    this.function.addPermission(`${this.pascalName}InvokePolicy${nanoid(4)}`, {
      ...permission,
      principal: _principal,
      action: 'lambda:InvokeFunction'
    });

    return this;
  }

  public addWarmingEvent(rule: Rule) {
    rule.addTarget(
      new LambdaFunction(this.function, {
        event: RuleTargetInput.fromObject({
          warmer: true
        })
      })
    );

    return this;
  }

  public addApiEvent(pathConfig: ApiEvent): Lambda {
    if (!isApiEvent(pathConfig)) {
      throw new Error('apiEvent must be an object with path, method and optional options');
    }
    this._addApiEvent(pathConfig);

    return this;
  }

  /**
   * @description Associates a table with the function.
   *
   * Applies grantReadWriteData for the function role if one was created.
   *
   * Adds table name to environment variables. As an example when passing in `table: "admin-table"` will set actual
   * prefixed tableName as `process.env.TABLE_NAME=client-project-env-admin-table` and
   * `process.env.ADMIN_TABLE=client-project-env-admin-table` by default.  You can override this with `tableEnvKey`
   * to create the environment variables as `TABLE_NAME` and the `TABLE_ENV_KEY` that was passed in.
   *
   * Is backwards compatible with passing `table: string` like LambdasAndLogGroups.  Need to pass in DynamoTables
   * construct for this functionality.  Can also be used with `table: string` when using Lambdas construct as
   * it will pass in the DynamoTables object for you.
   */
  public associateTable({
    table,
    tables,
    tableEnvKey
  }: Pick<LambdaProps, 'table' | 'tables' | 'tableEnvKey'>) {
    if (table && typeof table !== 'string') {
      return this._associateTable({ table, tableEnvKey });
    }

    if (!(tables instanceof Tables) || typeof table !== 'string') {
      throw new Error(
        'if not using lambda.table as a Table must pass in lambda.tables as DynamoTables and lambda.table as the un-prefixed table name'
      );
    }
    const _table = tables?.resources[table];
    if (!_table) {
      throw new Error(`table ${table} not found in tables`);
    }
    return this._associateTable({ tableEnvKey: tableEnvKey ?? table, table: _table });
  }

  private _associateTable({ tableEnvKey, table }: { tableEnvKey?: string; table: ITable }) {
    this.function.addEnvironment('TABLE_NAME', table.tableName);
    if (tableEnvKey) {
      this.function.addEnvironment(toEnv(tableEnvKey), table.tableName);
    }
    if (this.policy) {
      /**
       * check for policy not role as policy is only created if no role is passed ie
       * ie iam can be created/updated otherwise its up to the user to makes sure
       * the permissions are set correctly
       */
      table.grantReadWriteData(this.role);
    }

    return this;
  }

  private _buildIam() {
    if (this.props.role) {
      this.role =
        typeof this.props.role === 'string'
          ? Role.fromRoleArn(this, 'Role', this.props.role, { mutable: false })
          : this.props.role;
      return;
    }

    this.role = new Role(this, `${this.pascalName}Role`, {
      ...this.props,
      roleName: this.kebabName,
      assumedBy: new ServicePrincipal('lambda.amazonaws.com')
    });
    if (this.props.dontOverrideLogicalId !== true) {
      (this.role.node.defaultChild as CfnRole).overrideLogicalId(`${this.pascalName}Role`);
    }

    this.policy = new Policy(this, `${this.pascalName}Policy`, {
      ...this.props,
      policyName: this.kebabName,
      roles: [this.role],
      statements: (this.props.statements ?? []).concat(
        new PolicyStatement({
          actions: ['logs:DescribeLogStreams', 'logs:CreateLogStream', 'logs:PutLogEvents'],
          resources: [this.logGroup.logGroupArn]
        })
      )
    });
    if (this.props.dontOverrideLogicalId !== true) {
      (this.policy.node.defaultChild as CfnPolicy).overrideLogicalId(`${this.pascalName}Policy`);
    }
    this.policy.node.addDependency(this.role);
    if (this.props.vpc || this.props.vpcSubnets || this.props.securityGroups) {
      this.policy.addStatements(
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

    if (this.props.removalPolicy) {
      (this.role as Role).applyRemovalPolicy(this.props.removalPolicy);
      this.policy.applyRemovalPolicy(this.props.removalPolicy);
    }
  }

  private _filterApiEvents(_events: NonNullable<LambdaProps['events']>) {
    const events = _events.filter(event => !isApiEvent(event)) as IEventSource[];
    const apiEvents = _events.filter(event => isApiEvent(event)) as ApiEvent[];
    return { events, apiEvents };
  }

  private _getApi(): Api {
    if (this.props.api) {
      return this.props.api;
    }

    const stack = Stack.of(this);
    const existingApi = stack.node.tryFindChild('Api') as Api | undefined;
    if (existingApi) {
      return existingApi;
    }

    if (!this.props.prefix) {
      throw new Error(`prefix is required when an existing Api construct cannot be found.
Either pass in a prefix or an api. Or create an Api, at the stack
root where it can be found, before attempting to add api resources`);
    }

    return new Api(stack, 'Api', {
      prefix: this.props.prefix,
      stage: this.props.prefix.split('-').pop() as string
    });
  }

  private _addApiEvent(apiEvent: ApiEvent) {
    if (!this.api) {
      this.api = this._getApi();
    }
    const { path, method, options } = apiEvent;
    this.api.addLambda({ path, method, lambda: this.function, options });

    if (this.buildDevServer) {
      if (!(this.code instanceof AssetCode)) {
        throw new Error('cannot buildDevServer if code is not props.code is an AssetCode class');
      }

      addToDevServer({
        functionName: this.kebabName,
        memorySize: this.props.memorySize,
        resourcePath: path,
        method,
        handler: this.props.handler,
        timeoutInSeconds: this.props.timeout?.toSeconds(),
        region: Stack.of(this).region,
        accountId: Stack.of(this).account,
        codeDirectory: this.code.path,
        environment: this.props.environment
      });
    }

    return this;
  }
}
