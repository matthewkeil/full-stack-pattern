---
id: "LambdaProps"
title: "Interface: LambdaProps"
sidebar_label: "LambdaProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Mutable`](../modules#mutable)<`Omit`<`FunctionProps`, ``"functionName"`` \| ``"role"`` \| ``"code"`` \| ``"events"`` \| ``"layers"``\>\>

- [`Mutable`](../modules#mutable)<`Omit`<`RoleProps`, ``"roleName"`` \| ``"assumedBy"``\>\>

- [`Mutable`](../modules#mutable)<`Omit`<`PolicyProps`, ``"policyName"`` \| ``"roles"``\>\>

- [`Mutable`](../modules#mutable)<`Omit`<`LogGroupProps`, ``"logGroupName"``\>\>

  ↳ **`LambdaProps`**

## Properties

### allowAllOutbound

• `Optional` `Readonly` **allowAllOutbound**: false \| true

Whether to allow the Lambda to send all network traffic.

If set to false, you must individually add traffic rules to allow the
Lambda to connect to network targets.

**`default`** true

**`stability`** stable

#### Inherited from

Mutable.allowAllOutbound

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:184

___

### allowPublicSubnet

• `Optional` `Readonly` **allowPublicSubnet**: false \| true

Lambda Functions in a public subnet can NOT access the internet.

Use this property to acknowledge this limitation and still place the function in a public subnet.

**`default`** false

**`see`** https://stackoverflow.com/questions/52992085/why-cant-an-aws-lambda-function-inside-a-public-subnet-in-a-vpc-connect-to-the/52994841#52994841

**`stability`** stable

#### Inherited from

Mutable.allowPublicSubnet

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:311

___

### api

• `Optional` **api**: [`Api`](../classes/Api)

The Api to use with all ApiEvents. If no api is passed it looks at
Stack.of(this).node.tryFindChild('Api') base stack and will use the first
RestApi it finds if one exists.  If no api is passed to the constructor,
nor is there a RestApi resource in the stack, one will be created. It will
be built so all subsequent Lambdas will be able to find and use the same api.

#### Defined in

[src/constructs/Lambda.ts:146](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Lambda.ts#L146)

___

### architecture

• `Optional` `Readonly` **architecture**: `Architecture`

The system architectures compatible with this lambda function.

**`default`** Architecture.X86_64

**`stability`** stable

#### Inherited from

Mutable.architecture

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:339

___

### architectures

• `Optional` `Readonly` **architectures**: `Architecture`[]

(deprecated) DEPRECATED.

**`default`** [Architecture.X86_64]

**`deprecated`** use `architecture`

#### Inherited from

Mutable.architectures

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:332

___

### canInvoke

• `Optional` **canInvoke**: (`string` \| `IRole` \| `PrincipalBase`)[]

Array of principals that can invoke the lambda. Can pass a string arn, an IRole, or any Principal construct
and will create the AWS::Lambda::Permission for you.

#### Defined in

[src/constructs/Lambda.ts:111](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Lambda.ts#L111)

___

### code

• **code**: `string` \| `Code`

Code to use with the lambda.  Can pass a string to the absolute path of the code folder and the AssetCode
will be created for you.  You can also pass in any Construct that extends Code
ie. InlineCode, AssetCode, S3Code, etc.

#### Defined in

[src/constructs/Lambda.ts:72](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Lambda.ts#L72)

___

### codeSigningConfig

• `Optional` `Readonly` **codeSigningConfig**: `ICodeSigningConfig`

Code signing config associated with this function.

**`default`** - Not Sign the Code

**`stability`** stable

#### Inherited from

Mutable.codeSigningConfig

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:325

___

### currentVersionOptions

• `Optional` `Readonly` **currentVersionOptions**: `VersionOptions`

Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method.

**`default`** - default options as described in `VersionOptions`

**`stability`** stable

#### Inherited from

Mutable.currentVersionOptions

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:294

___

### deadLetterQueue

• `Optional` `Readonly` **deadLetterQueue**: `IQueue`

The SQS queue to use if DLQ is enabled.

**`default`** - SQS queue with 14 day retention period if `deadLetterQueueEnabled` is `true`

**`stability`** stable

#### Inherited from

Mutable.deadLetterQueue

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:201

___

### deadLetterQueueEnabled

• `Optional` `Readonly` **deadLetterQueueEnabled**: false \| true

Enabled DLQ.

If `deadLetterQueue` is undefined,
an SQS queue with default options will be defined for your Function.

**`default`** - false unless `deadLetterQueue` is set, which implies DLQ is enabled.

**`stability`** stable

#### Inherited from

Mutable.deadLetterQueueEnabled

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:194

___

### description

• `Optional` `Readonly` **description**: `string`

A description of the function.

**`default`** - No description.

**`stability`** stable

#### Inherited from

Mutable.description

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:61

___

### document

• `Optional` `Readonly` **document**: `PolicyDocument`

Initial PolicyDocument to use for this Policy.

If omited, any
`PolicyStatement` provided in the `statements` property will be applied
against the empty default `PolicyDocument`.

**`default`** - An empty policy.

**`stability`** stable

#### Inherited from

Mutable.document

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/policy.d.ts:103

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

Option to not use fixed logicalId's for the RestApi resource. For more
info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

**`default`** false (resources will have their logicalId's set by the library and not cdk)

#### Defined in

[src/constructs/Lambda.ts:94](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Lambda.ts#L94)

___

### encryptionKey

• `Optional` `Readonly` **encryptionKey**: `IKey`

The KMS Key to encrypt the log group with.

**`default`** - log group is encrypted with the default master key

**`stability`** stable

#### Inherited from

Mutable.encryptionKey

#### Defined in

node_modules/@aws-cdk/aws-logs/lib/log-group.d.ts:296

___

### environment

• `Optional` `Readonly` **environment**: `Object`

Key-value pairs that Lambda caches and makes available for your Lambda functions.

Use environment variables to apply configuration changes, such
as test and production environment configurations, without changing your
Lambda function source code.

**`default`** - No environment variables.

**`stability`** stable

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

Mutable.environment

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:82

___

### environmentEncryption

• `Optional` `Readonly` **environmentEncryption**: `IKey`

The AWS KMS key that's used to encrypt your function's environment variables.

**`default`** - AWS Lambda creates and uses an AWS managed customer master key (CMK).

**`stability`** stable

#### Inherited from

Mutable.environmentEncryption

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:318

___

### events

• `Optional` **events**: ([`ApiEvent`](ApiEvent) \| `IEventSource`)[]

Similar to the underlying LambdaProps.events but adds support for the
ApiEvent from this library.  Works in conjunction with the Api construct.

ApiEvents will build a dev server that can be run locally through the use
of [convert-lambda-to-express](https://www.npmjs.com/package/convert-lambda-to-express) library

See [convert-lambda-to-express](https://www.npmjs.com/package/convert-lambda-to-express) for more information about
how to use this feature.

#### Defined in

[src/constructs/Lambda.ts:137](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Lambda.ts#L137)

___

### existingLogGroups

• `Optional` **existingLogGroups**: `string`[]

Handy feature to plug into existing logGroups.  Pass an array of strings
that are the logGroup names in the target account and any log groups that
exist will not be created. ie no thrown errors, and stack rollbacks, for
log groups that exist

#### Defined in

[src/constructs/Lambda.ts:154](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Lambda.ts#L154)

___

### externalId

• `Optional` `Readonly` **externalId**: `string`

(deprecated) ID that the role assumer needs to provide when assuming this role.

If the configured and provided external IDs do not match, the
AssumeRole operation will fail.

**`default`** No external ID required

**`deprecated`** see [externalIds](LambdaProps#externalids)

#### Inherited from

Mutable.externalId

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/role.d.ts:34

___

### externalIds

• `Optional` `Readonly` **externalIds**: `string`[]

List of IDs that the role assumer needs to provide one of when assuming this role.

If the configured and provided external IDs do not match, the
AssumeRole operation will fail.

**`default`** No external ID required

**`stability`** stable

#### Inherited from

Mutable.externalIds

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/role.d.ts:44

___

### filesystem

• `Optional` `Readonly` **filesystem**: `FileSystem`

The filesystem configuration for the lambda function.

**`default`** - will not mount any filesystem

**`stability`** stable

#### Inherited from

Mutable.filesystem

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:301

___

### force

• `Optional` `Readonly` **force**: false \| true

Force creation of an `AWS::IAM::Policy`.

Unless set to `true`, this `Policy` construct will not materialize to an
`AWS::IAM::Policy` CloudFormation resource in case it would have no effect
(for example, if it remains unattached to an IAM identity or if it has no
statements). This is generally desired behavior, since it prevents
creating invalid--and hence undeployable--CloudFormation templates.

In cases where you know the policy must be created and it is actually
an error if no statements have been added to it, you can set this to `true`.

**`default`** false

**`stability`** stable

#### Inherited from

Mutable.force

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/policy.d.ts:92

___

### groups

• `Optional` `Readonly` **groups**: `IGroup`[]

Groups to attach this policy to.

You can also use `attachToGroup(group)` to attach this policy to a group.

**`default`** - No groups.

**`stability`** stable

#### Inherited from

Mutable.groups

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/policy.d.ts:67

___

### handler

• `Readonly` **handler**: `string`

The name of the method within your code that Lambda calls to execute your function.

The format includes the file name. It can also include
namespaces and other qualifiers, depending on the runtime.
For more information, see https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-features.html#gettingstarted-features-programmingmodel.

Use `Handler.FROM_IMAGE` when defining a function from a Docker image.

NOTE: If you specify your source code as inline text by specifying the
ZipFile property within the Code property, specify index.function_name as
the handler.

**`stability`** stable

#### Inherited from

Mutable.handler

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:381

___

### initialPolicy

• `Optional` `Readonly` **initialPolicy**: `PolicyStatement`[]

Initial policy statements to add to the created Lambda Role.

You can call `addToRolePolicy` to the created lambda to add statements post creation.

**`default`** - No policy statements are added to the created Lambda role.

**`stability`** stable

#### Inherited from

Mutable.initialPolicy

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:112

___

### inlinePolicies

• `Optional` `Readonly` **inlinePolicies**: `Object`

A list of named policies to inline into this role.

These policies will be
created with the role, whereas those added by ``addToPolicy`` are added
using a separate CloudFormation resource (allowing a way around circular
dependencies that could otherwise be introduced).

**`default`** - No policy is inlined in the Role resource.

**`stability`** stable

#### Index signature

▪ [name: `string`]: `PolicyDocument`

#### Inherited from

Mutable.inlinePolicies

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/role.d.ts:66

___

### insightsVersion

• `Optional` `Readonly` **insightsVersion**: `LambdaInsightsVersion`

Specify the version of CloudWatch Lambda insights to use for monitoring.

**`default`** - No Lambda Insights

**`see`** https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights-Getting-Started-docker.html

**`stability`** stable

#### Inherited from

Mutable.insightsVersion

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:232

___

### layers

• `Optional` **layers**: (`string` \| `LayerVersion`)[]

LayerVersions to use with the lambda.  Can pass in a strings, that are absolute path to the layer folder,
and the AssetCode will be made for the directory.  Can also pass in an array of LayerVersion constructs.

#### Defined in

[src/constructs/Lambda.ts:100](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Lambda.ts#L100)

___

### logRetention

• `Optional` `Readonly` **logRetention**: `ONE_DAY` \| `THREE_DAYS` \| `FIVE_DAYS` \| `ONE_WEEK` \| `TWO_WEEKS` \| `ONE_MONTH` \| `TWO_MONTHS` \| `THREE_MONTHS` \| `FOUR_MONTHS` \| `FIVE_MONTHS` \| `SIX_MONTHS` \| `ONE_YEAR` \| `THIRTEEN_MONTHS` \| `EIGHTEEN_MONTHS` \| `TWO_YEARS` \| `FIVE_YEARS` \| `TEN_YEARS` \| `INFINITE`

The number of days log events are kept in CloudWatch Logs.

When updating
this property, unsetting it doesn't remove the log retention policy. To
remove the retention policy, set the value to `INFINITE`.

**`default`** logs.RetentionDays.INFINITE

**`stability`** stable

#### Inherited from

Mutable.logRetention

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:271

___

### logRetentionRetryOptions

• `Optional` `Readonly` **logRetentionRetryOptions**: `LogRetentionRetryOptions`

When log retention is specified, a custom resource attempts to create the CloudWatch log group.

These options control the retry policy when interacting with CloudWatch APIs.

**`default`** - Default AWS SDK retry options.

**`stability`** stable

#### Inherited from

Mutable.logRetentionRetryOptions

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:287

___

### logRetentionRole

• `Optional` `Readonly` **logRetentionRole**: `IRole`

The IAM role for the Lambda function associated with the custom resource that sets the retention policy.

**`default`** - A new role is created.

**`stability`** stable

#### Inherited from

Mutable.logRetentionRole

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:278

___

### loggingLevel

• `Optional` **loggingLevel**: ``"DEBUG"`` \| ``"INFO"`` \| ``"WARNING"`` \| ``"ERROR"`` \| ``"CRITICAL"``

Adds process.env.LOGGING_LEVEL to the lambda environment. Can be set to:
'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL'

#### Defined in

[src/constructs/Lambda.ts:125](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Lambda.ts#L125)

___

### managedPolicies

• `Optional` `Readonly` **managedPolicies**: `IManagedPolicy`[]

A list of managed policies associated with this role.

You can add managed policies later using
`addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName(policyName))`.

**`default`** - No managed policies.

**`stability`** stable

#### Inherited from

Mutable.managedPolicies

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/role.d.ts:54

___

### maxEventAge

• `Optional` `Readonly` **maxEventAge**: `Duration`

The maximum age of a request that Lambda sends to a function for processing.

Minimum: 60 seconds
Maximum: 6 hours

**`default`** Duration.hours(6)

**`stability`** stable

#### Inherited from

Mutable.maxEventAge

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/event-invoke-config.d.ts:34

___

### maxSessionDuration

• `Optional` `Readonly` **maxSessionDuration**: `Duration`

The maximum session duration that you want to set for the specified role.

This setting can have a value from 1 hour (3600sec) to 12 (43200sec) hours.

Anyone who assumes the role from the AWS CLI or API can use the
DurationSeconds API parameter or the duration-seconds CLI parameter to
request a longer session. The MaxSessionDuration setting determines the
maximum duration that can be requested using the DurationSeconds
parameter.

If users don't specify a value for the DurationSeconds parameter, their
security credentials are valid for one hour by default. This applies when
you use the AssumeRole* API operations or the assume-role* CLI operations
but does not apply when you use those operations to create a console URL.

**`default`** Duration.hours(1)

**`stability`** stable

**`link`** https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html

#### Inherited from

Mutable.maxSessionDuration

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/role.d.ts:132

___

### memorySize

• `Optional` `Readonly` **memorySize**: `number`

The amount of memory, in MB, that is allocated to your Lambda function.

Lambda uses this value to proportionally allocate the amount of CPU
power. For more information, see Resource Model in the AWS Lambda
Developer Guide.

**`default`** 128

**`stability`** stable

#### Inherited from

Mutable.memorySize

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:103

___

### name

• **name**: `string`

The name of the resources to make.  Generally this is a few short words.  When passing `prefix` and
`name` the physical name of resources will take the format of `${prefix}-${name}`.  If just name is passed
they will just be the value of `name`

#### Defined in

[src/constructs/Lambda.ts:79](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Lambda.ts#L79)

___

### onFailure

• `Optional` `Readonly` **onFailure**: `IDestination`

The destination for failed invocations.

**`default`** - no destination

**`stability`** stable

#### Inherited from

Mutable.onFailure

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/event-invoke-config.d.ts:17

___

### onSuccess

• `Optional` `Readonly` **onSuccess**: `IDestination`

The destination for successful invocations.

**`default`** - no destination

**`stability`** stable

#### Inherited from

Mutable.onSuccess

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/event-invoke-config.d.ts:24

___

### path

• `Optional` `Readonly` **path**: `string`

The path associated with this role.

For information about IAM paths, see
Friendly Names and Paths in IAM User Guide.

**`default`** /

**`stability`** stable

#### Inherited from

Mutable.path

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/role.d.ts:78

___

### permissionsBoundary

• `Optional` `Readonly` **permissionsBoundary**: `IManagedPolicy`

AWS supports permissions boundaries for IAM entities (users or roles).

A permissions boundary is an advanced feature for using a managed policy
to set the maximum permissions that an identity-based policy can grant to
an IAM entity. An entity's permissions boundary allows it to perform only
the actions that are allowed by both its identity-based policies and its
permissions boundaries.

**`default`** - No permissions boundary.

**`stability`** stable

**`link`** https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html

#### Inherited from

Mutable.permissionsBoundary

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/role.d.ts:92

___

### prefix

• `Optional` **prefix**: `string`

The prefix to use for the resources.  Will prefix all resource names with this value. For more info, see
[Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Defined in

[src/constructs/Lambda.ts:86](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Lambda.ts#L86)

___

### profiling

• `Optional` `Readonly` **profiling**: false \| true

Enable profiling.

**`default`** - No profiling.

**`see`** https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html

**`stability`** stable

#### Inherited from

Mutable.profiling

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:216

___

### profilingGroup

• `Optional` `Readonly` **profilingGroup**: `IProfilingGroup`

Profiling Group.

**`default`** - A new profiling group will be created if `profiling` is set.

**`see`** https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html

**`stability`** stable

#### Inherited from

Mutable.profilingGroup

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:224

___

### removalPolicy

• `Optional` `Readonly` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

Determine the removal policy of this log group.

Normally you want to retain the log group so you can diagnose issues
from logs even after a deployment that no longer includes the log group.
In that case, use the normal date-based retention policy to age out your
logs.

**`default`** RemovalPolicy.Retain

**`stability`** stable

#### Inherited from

Mutable.removalPolicy

#### Defined in

node_modules/@aws-cdk/aws-logs/lib/log-group.d.ts:324

___

### reservedConcurrentExecutions

• `Optional` `Readonly` **reservedConcurrentExecutions**: `number`

The maximum of concurrent executions you want to reserve for the function.

**`default`** - No specific limit - account limit.

**`see`** https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html

**`stability`** stable

#### Inherited from

Mutable.reservedConcurrentExecutions

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:251

___

### retention

• `Optional` `Readonly` **retention**: `ONE_DAY` \| `THREE_DAYS` \| `FIVE_DAYS` \| `ONE_WEEK` \| `TWO_WEEKS` \| `ONE_MONTH` \| `TWO_MONTHS` \| `THREE_MONTHS` \| `FOUR_MONTHS` \| `FIVE_MONTHS` \| `SIX_MONTHS` \| `ONE_YEAR` \| `THIRTEEN_MONTHS` \| `EIGHTEEN_MONTHS` \| `TWO_YEARS` \| `FIVE_YEARS` \| `TEN_YEARS` \| `INFINITE`

How long, in days, the log contents will be retained.

To retain all logs, set this value to RetentionDays.INFINITE.

**`default`** RetentionDays.TWO_YEARS

**`stability`** stable

#### Inherited from

Mutable.retention

#### Defined in

node_modules/@aws-cdk/aws-logs/lib/log-group.d.ts:312

___

### retryAttempts

• `Optional` `Readonly` **retryAttempts**: `number`

The maximum number of times to retry when the function returns an error.

Minimum: 0
Maximum: 2

**`default`** 2

**`stability`** stable

#### Inherited from

Mutable.retryAttempts

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/event-invoke-config.d.ts:44

___

### role

• `Optional` **role**: `string` \| `IRole`

The IRole or arn of the service role. If a LambdaProps.role is passed no IAM will be created

#### Defined in

[src/constructs/Lambda.ts:105](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Lambda.ts#L105)

___

### runtime

• `Readonly` **runtime**: `Runtime`

The runtime environment for the Lambda function that you are uploading.

For valid values, see the Runtime property in the AWS Lambda Developer
Guide.

Use `Runtime.FROM_IMAGE` when when defining a function from a Docker image.

**`stability`** stable

#### Inherited from

Mutable.runtime

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:355

___

### securityGroup

• `Optional` `Readonly` **securityGroup**: `ISecurityGroup`

(deprecated) What security group to associate with the Lambda's network interfaces. This property is being deprecated, consider using securityGroups instead.

Only used if 'vpc' is supplied.

Use securityGroups property instead.
Function constructor will throw an error if both are specified.

**`default`** - If the function is placed within a VPC and a security group is
not specified, either by this or securityGroups prop, a dedicated security
group will be created for this function.

**`deprecated`** - This property is deprecated, use securityGroups instead

#### Inherited from

Mutable.securityGroup

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:163

___

### securityGroups

• `Optional` `Readonly` **securityGroups**: `ISecurityGroup`[]

The list of security groups to associate with the Lambda's network interfaces.

Only used if 'vpc' is supplied.

**`default`** - If the function is placed within a VPC and a security group is
not specified, either by this or securityGroup prop, a dedicated security
group will be created for this function.

**`stability`** stable

#### Inherited from

Mutable.securityGroups

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:174

___

### statements

• `Optional` `Readonly` **statements**: `PolicyStatement`[]

Initial set of permissions to add to this policy document.

You can also use `addStatements(...statement)` to add permissions later.

**`default`** - No statements.

**`stability`** stable

#### Inherited from

Mutable.statements

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/policy.d.ts:76

___

### table

• `Optional` **table**: `string` \| `ITable`

Associates a table with the lambda function.  Can be passed as a Table or
a string. When using a string must also pass a Tables object to the
`tables` prop.  This is mostly a convention for use with the Lambdas and
Tables constructs so its easier to created the lambda definitions.  See
the LambdasProps.tables for more information.

#### Defined in

[src/constructs/Lambda.ts:163](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Lambda.ts#L163)

___

### tableEnvKey

• `Optional` **tableEnvKey**: `string`

By default, this construct sets the tableName to the environment for you.

If a name of 'good-stuff-table' is used, will set environment variables as:
  - `process.env.TABLE_NAME = "full-table-name-for-sdk"`
  - `process.env.GOOD_STUFF_TABLE = "full-table-name-for-sdk"`

You can override this with `tableEnvKey: "SOME_ENV_KEY"` to create the
environment variables as:
  - `process.env.TABLE_NAME = "full-table-name-for-sdk"`
  - `process.env.SOME_ENV_KEY = "full-table-name-for-sdk"`

#### Defined in

[src/constructs/Lambda.ts:184](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Lambda.ts#L184)

___

### tables

• `Optional` **tables**: [`Tables`](../classes/Tables)

Tables construct to make use of LambdaProps.table as a string.  Will do
a lookup to find the table from the tables object using the string as the
name

#### Defined in

[src/constructs/Lambda.ts:170](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Lambda.ts#L170)

___

### timeout

• `Optional` `Readonly` **timeout**: `Duration`

The function execution time (in seconds) after which Lambda terminates the function.

Because the execution time affects cost, set this value
based on the function's expected execution time.

**`default`** Duration.seconds(3)

**`stability`** stable

#### Inherited from

Mutable.timeout

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:71

___

### tracing

• `Optional` `Readonly` **tracing**: `ACTIVE` \| `PASS_THROUGH` \| `DISABLED`

Enable AWS X-Ray Tracing for Lambda Function.

**`default`** Tracing.Disabled

**`stability`** stable

#### Inherited from

Mutable.tracing

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:208

___

### users

• `Optional` `Readonly` **users**: `IUser`[]

Users to attach this policy to.

You can also use `attachToUser(user)` to attach this policy to a user.

**`default`** - No users.

**`stability`** stable

#### Inherited from

Mutable.users

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/policy.d.ts:49

___

### vpc

• `Optional` `Readonly` **vpc**: `IVpc`

VPC network to place Lambda network interfaces.

Specify this if the Lambda function needs to access resources in a VPC.

**`default`** - Function is not placed within a VPC.

**`stability`** stable

#### Inherited from

Mutable.vpc

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:139

___

### vpcSubnets

• `Optional` `Readonly` **vpcSubnets**: `SubnetSelection`

Where to place the network interfaces within the VPC.

Only used if 'vpc' is supplied. Note: internet access for Lambdas
requires a NAT gateway, so picking Public subnets is not allowed.

**`default`** - the Vpc default strategy if not specified

**`stability`** stable

#### Inherited from

Mutable.vpcSubnets

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:149

___

### warmingEvent

• `Optional` **warmingEvent**: `Rule`

simplifies warming the function. Timing will be base by the Rule that gets
passed.  Event will emit the { warmer: true } object to the function

code can easily check for warming event and return early

#### Defined in

[src/constructs/Lambda.ts:119](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Lambda.ts#L119)
