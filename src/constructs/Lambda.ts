import { nanoid } from 'nanoid';
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
  LayerVersion
} from '@aws-cdk/aws-lambda';

import { LogLevel } from '../../lib/Logger';
import { Mutable } from '../../lib/Mutable';
import { HttpMethod, isHttpMethod } from '../../lib/HttpMethod';
import { toKebab, toPascal, toEnv } from '../../lib/changeCase';

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
  extends Mutable<Omit<FunctionProps, 'functionName' | 'role' | 'code' | 'events' | 'layers'>>,
    Mutable<Omit<RoleProps, 'roleName' | 'assumedBy'>>,
    Mutable<Omit<PolicyProps, 'policyName' | 'roles'>>,
    Mutable<Omit<LogGroupProps, 'logGroupName'>> {
  /**
   * Code to use with the lambda.  Can pass a string to the absolute path of the code folder and the AssetCode
   * will be created for you.  You can also pass in any Construct that extends Code
   * ie. InlineCode, AssetCode, S3Code, etc.
   */
  code: string | Code;

  /**
   * The name of the resources to make.  Generally this is a few short words.  When passing `prefix` and
   * `name` the physical name of resources will take the format of `${prefix}-${name}`.  If just name is passed
   * they will just be the value of `name`
   */
  name: string;

  /**
   * The prefix to use for the resources.  Will prefix all resource names with this value. For more info, see
   * [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   */

  prefix?: string;

  /**
   * Option to not use fixed logicalId's for the RestApi resource. For more
   * info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   *
   * @default false (resources will have their logicalId's set by the library and not cdk)
   */
  dontOverrideLogicalId?: boolean;

  /**
   * LayerVersions to use with the lambda.  Can pass in a strings, that are absolute path to the layer folder,
   * and the AssetCode will be made for the directory.  Can also pass in an array of LayerVersion constructs.
   */
  layers?: (LayerVersion | string)[];

  /**
   * The IRole or arn of the service role. If a LambdaProps.role is passed no IAM will be created
   */
  role?: IRole | string;

  /**
   * Array of principals that can invoke the lambda. Can pass a string arn, an IRole, or any Principal construct
   * and will create the AWS::Lambda::Permission for you.
   */
  canInvoke?: (PrincipalBase | IRole | string)[];

  /**
   * simplifies warming the function. Timing will be base by the Rule that gets
   * passed.  Event will emit the { warmer: true } object to the function
   *
   * code can easily check for warming event and return early
   */
  warmingEvent?: Rule;

  /**
   * Adds process.env.LOGGING_LEVEL to the lambda environment. Can be set to:
   * 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL'
   */
  loggingLevel?: LogLevel;

  /**
   * Similar to the underlying LambdaProps.events but adds support for the
   * ApiEvent from this library.  Works in conjunction with the Api construct.
   *
   * ApiEvents will build a dev server that can be run locally through the use
   * of [convert-lambda-to-express](https://www.npmjs.com/package/convert-lambda-to-express) library
   *
   * See [convert-lambda-to-express](https://www.npmjs.com/package/convert-lambda-to-express) for more information about
   * how to use this feature.
   */
  events?: (IEventSource | ApiEvent)[];

  /**
   * The Api to use with all ApiEvents. If no api is passed it looks at
   * Stack.of(this).node.tryFindChild('Api') base stack and will use the first
   * RestApi it finds if one exists.  If no api is passed to the constructor,
   * nor is there a RestApi resource in the stack, one will be created. It will
   * be built so all subsequent Lambdas will be able to find and use the same api.
   */
  api?: Api;

  /**
   * Handy feature to plug into existing logGroups.  Pass an array of strings
   * that are the logGroup names in the target account and any log groups that
   * exist will not be created. ie no thrown errors, and stack rollbacks, for
   * log groups that exist
   */
  existingLogGroups?: string[];

  /**
   * Associates a table with the lambda function.  Can be passed as a Table or
   * a string. When using a string must also pass a Tables object to the
   * `tables` prop.  This is mostly a convention for use with the Lambdas and
   * Tables constructs so its easier to created the lambda definitions.  See
   * the LambdasProps.tables for more information.
   */
  table?: ITable | string;

  /**
   * Tables construct to make use of LambdaProps.table as a string.  Will do
   * a lookup to find the table from the tables object using the string as the
   * name
   */
  tables?: Tables;

  /**
   * By default, this construct sets the tableName to the environment for you.
   *
   * If a name of 'good-stuff-table' is used, will set environment variables as:
   *   - `process.env.TABLE_NAME = "full-table-name-for-sdk"`
   *   - `process.env.GOOD_STUFF_TABLE = "full-table-name-for-sdk"`
   *
   * You can override this with `tableEnvKey: "SOME_ENV_KEY"` to create the
   * environment variables as:
   *   - `process.env.TABLE_NAME = "full-table-name-for-sdk"`
   *   - `process.env.SOME_ENV_KEY = "full-table-name-for-sdk"`
   */
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
  public code: Code;

  private pascalName: string;
  private kebabName: string;

  constructor(scope: Construct, id: string, public readonly props: LambdaProps) {
    super(scope, id);
    const name = props.prefix ? `${props.prefix}-${props.name}` : props.name;
    this.pascalName = toPascal(name);
    this.kebabName = toKebab(name).substr(0, 64);

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

    this.code = typeof props.code === 'string' ? new AssetCode(props.code) : props.code;

    this.function = new BaseLambda(this, 'Function', {
      ...props,
      events: undefined,
      layers,
      code: this.code,
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

  /**
   * simplifies the underlying `lambda.Function.prototype.addPermission`
   *
   * - adds ability to just pass and arn as a string. automatically sets up
   *   the principal
   * - adds the invoke action
   */
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

  /**
   * simplifies warming the function. Timing will be base by the Rule that gets
   * passed.  Event will emit the { warmer: true } object to the function
   *
   * code can easily check for warming event and return early
   */
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

  /**
   * - adds an api event to the lambda: hooks up apiGateway to trigger the lambda
   * and adds the necessary permissions.
   *
   * - builds an express server to server the lambdas during development. devServer
   * supports hot reload and watch functionality. see [convert-lambda-to-express](https://www.npmjs.com/package/convert-lambda-to-express)
   * for more information
   *
   * - can, optionally, pass in the RestApi that you want associated to the function
   * through the LambdaProps.api property when new'ing the Lambda.  If no api is
   * passed it looks at Stack.of(this).node.tryFindChild('Api') base stack and will
   * use the first RestApi it finds if one exists.  If no api is passed to the
   * constructor, nor is there a RestApi resource in the stack, one will be
   * created. It will be built so all subsequent Lambdas will be able to find
   * and use the same api.
   *
   * If api is looked up then it can be anywhere in your code as long as its built
   * before trying to add an ApiEvent. Note that building the Lambda with an event in
   * the constructor props will call the .addApiEvent method under the hood. The
   * logicalId for the lookup method must be 'Api'.
   *
   * If you want to use a different Api logicalId, you can pass in the Api object
   * directly to the constructor
   */
  public addApiEvent(pathConfig: ApiEvent): Lambda {
    if (!isApiEvent(pathConfig)) {
      throw new Error('apiEvent must be an object with path, method and optional options');
    }
    this._addApiEvent(pathConfig);

    return this;
  }

  /**
   * Applies table.grantReadWriteData(role) for the function role if one was created.
   *
   * Adds table name to environment variables. As an example when passing in
   * `table: "good-stuff-table"` will, by default, set actual tableName as:
   *   - `process.env.TABLE_NAME=client-project-env-good-stuff-table`
   *   - `process.env.GOOD_STUFF_TABLE=client-project-env-good-stuff-table`
   *
   * You can override this with `tableEnvKey: TABLE_ENV_KEY` to create the
   * environment variables as:
   * `process.env.TABLE_NAME`
   * `process.env.TABLE_ENV_KEY`
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
    this.api.addLambda({ path, method, lambda: this, options });

    return this;
  }
}
