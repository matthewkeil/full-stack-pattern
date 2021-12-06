---
sidebar_position: 2
---

# Lambda

Lambda is a higher order construct that handles some nuances of working with the AWS Lambda service. It builds a Function, LogGroup and Role with Policy similarly to the L2 Function construct but with a few notable exceptions. In particular when working in an environment where you do not have access to IAM you can prevent the creation of any.

## LambdaProps

Inherits all properties from all of the resources it creates. Can set any option from the following list with a few exceptions (noted in parentheses):

- [FunctionProps](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.FunctionProps.html) <sub><sup>(`functionName`)</sup></sub>
- [RoleProps](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-iam.RoleProps.html) <sub><sup>(`roleName`, `assumedBy`)</sup></sub>
- [PolicyProps](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-iam.PolicyProps.html) <sub><sup>(`policyName`, `roles`)</sup></sub>
- [LogGroupProps](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-logs.LogGroupProps.html) <sub><sup>(`logGroupName`)</sup></sub>

```typescript
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
```

## Usage Example

```typescript
import { Rule } from '@aws-cdk/aws-events';
import { Api, Lambda } from 'ful-stack-pattern';

interface FancyStackProps {
  prefix: string;
  serviceRoleArn: string;
  crossAccountRoleArn: string;
}

class FancyStack extends Stack {
  constructor(scope: Construct, id: string, props: FancyStackProps) {
    super(scope, id, props);

    /**
     * for iam restrictive environments, just pass in the roleArn
     * and no iam will be created. can also pass in IRole if execution
     * role is already a construct
     */
    const noIamLambda = new Lambda(this, 'NoIamLambda', {
      name: 'no-iam-lambda',
      role: props.crossAccountRoleArn
    });

    const lambda = new Lambda(this, 'DoesSomethingFancy', {
      // unique to this library
      name: 'does-something-fancy',
      prefix: props.prefix,
      // prop that will get passed to multiple underlying constructs
      // (e.g. CfnFunction and CfnRole)
      description: 'Does something fancy',
      // `runtime` and `handler` inherited from `LambdaProps`
      runtime: Runtime.NODEJS_14_X,
      handler: 'index.handler',
      // `logRetention` inherited from LogGroupProps
      logRetention: RetentionDays.ONE_WEEK,
      // `path` inherited from RoleProps
      path: '/s3',
      /**
       * `statements` inherited from PolicyProps
       *
       * if using construct generated iam it automatically sets up basic iam
       * execution policy:
       * - allows role to 'DescribeLogStreams', 'CreateLogStream', 'PutLogEvents'
       *   on its own LogGroup
       * - if a vpc is configured it automatically adds 'CreateNetworkInterface',
       *   'DescribeNetworkInterfaces', 'DeleteNetworkInterface',
       *   'AssignPrivateIpAddresses' and 'UnassignPrivateIpAddresses'
       *
       */
      statements: new PolicyStatement({
        actions: ['s3:GetObject'],
        resources: ['*']
      })
    });

    /**
     * simplifies warming the function. Timing will be base by the Rule that gets
     * passed.  Event will emit the { warmer: true } object to the function
     *
     * code can easily check for warming event and return early
     */
    const rule = new Rule(this, 'WarmingRule', {
      /* setup your schedule here */
    });
    lambda.addWarmingEvent(rule);

    /**
     * simplifies the underlying `lambda.Function.prototype.addPermission`
     *
     * - adds ability to just pass and arn as a string. automatically sets up
     *   the principal
     * - adds the invoke action
     */
    lambda.addPermission(props.serviceRoleArn);

    /**
     * - adds an api event to the lambda: hooks up apiGateway to trigger the lambda
     * and adds the necessary permissions.
     *
     * - builds an express server to server the lambdas during development. devServer
     * supports hot reload and watch functionality. see [convert-lambda-to-express](https://www.npmjs.com/package/convert-lambda-to-express)
     * for more information
     *
     */
    const pathConfig: ApiEvent = {
      path: '/fancy',
      method: 'GET'
    };
    /**
     * Can, optionally, pass in the RestApi that you want associated to the function
     * through the LambdaProps.api property when new'ing the Lambda.  If no api is
     * passed it looks at Stack.of(this).node.tryFindChild('Api') base stack and will
     * use the first RestApi it finds if one exists.  If no api is passed to the
     * constructor, nor is there a RestApi resource in the stack, one will be
     * created. It will be built so all subsequent Lambdas will be able to find
     * and use the same api.
     *
     * This will be the Api that the lambda will find and use. Can be anywhere in your code
     * as long as its built before trying to add an ApiEvent. Note that building the Lambda
     * with an event in the constructor props will call the .addApiEvent method under the
     * hood. The logicalId for the lookup method must be 'Api'.  If you want to use a
     * different logicalId, you can pass in the Api object directly to the constructor
     */
    const api = new Api(this, 'Api'); // note the "Api" logicalId
    lambda.addApiEvent(pathConfig);

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
    const table = new Table(this, 'Table', {
      /* see Table page for more info */
    });
    lambda.associateTable(table);

    /**
     *
     * NOTE: all methods are chain-able. ie:
     *
     * lambda
     *   .addWarmingEvent(rule)
     *   .addPermission(props.serviceRoleArn)
     *   .addApiEvent(pathConfig)
     *   .associateTable(table);
     *
     */
  }
}
```
