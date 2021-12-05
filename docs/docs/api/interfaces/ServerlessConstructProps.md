---
id: "ServerlessConstructProps"
title: "Interface: ServerlessConstructProps"
sidebar_label: "ServerlessConstructProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`ApiProps`](ApiProps)

- `Pick`<[`TablesProps`](TablesProps), ``"tables"`` \| ``"existingTables"``\>

- `Omit`<[`LambdasProps`](LambdasProps), ``"tables"`` \| ``"prefix"``\>

  ↳ **`ServerlessConstructProps`**

  ↳↳ [`ServerlessStackProps`](ServerlessStackProps)

  ↳↳ [`ServerlessNestedStackProps`](ServerlessNestedStackProps)

## Properties

### allowAllOutbound

• `Optional` `Readonly` **allowAllOutbound**: false \| true

Whether to allow the Lambda to send all network traffic.

If set to false, you must individually add traffic rules to allow the
Lambda to connect to network targets.

**`default`** true

**`stability`** stable

#### Inherited from

Omit.allowAllOutbound

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

Omit.allowPublicSubnet

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:311

___

### api

• `Optional` **api**: [`Api`](../classes/Api)

#### Inherited from

Omit.api

#### Defined in

[src/constructs/Lambda.ts:81](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L81)

___

### apiKeySourceType

• `Optional` `Readonly` **apiKeySourceType**: `HEADER` \| `AUTHORIZER`

The source of the API key for metering requests according to a usage plan.

**`default`** - Metering is disabled.

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[apiKeySourceType](ApiProps#apikeysourcetype)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:248

___

### architecture

• `Optional` `Readonly` **architecture**: `Architecture`

The system architectures compatible with this lambda function.

**`default`** Architecture.X86_64

**`stability`** stable

#### Inherited from

Omit.architecture

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:339

___

### architectures

• `Optional` `Readonly` **architectures**: `Architecture`[]

(deprecated) DEPRECATED.

**`default`** [Architecture.X86_64]

**`deprecated`** use `architecture`

#### Inherited from

Omit.architectures

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:332

___

### binaryMediaTypes

• `Optional` `Readonly` **binaryMediaTypes**: `string`[]

The list of binary media mime-types that are supported by the RestApi resource, such as "image/png" or "application/octet-stream".

**`default`** - RestApi supports only UTF-8-encoded text payloads.

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[binaryMediaTypes](ApiProps#binarymediatypes)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:222

___

### buildDevServer

• `Optional` **buildDevServer**: false \| true

#### Inherited from

Omit.buildDevServer

#### Defined in

[src/constructs/Lambda.ts:83](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L83)

___

### canInvoke

• `Optional` **canInvoke**: (`string` \| `IRole` \| `PrincipalBase`)[]

#### Inherited from

Omit.canInvoke

#### Defined in

[src/constructs/Lambda.ts:79](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L79)

___

### cloneFrom

• `Optional` `Readonly` **cloneFrom**: `IRestApi`

The ID of the API Gateway RestApi resource that you want to clone.

**`default`** - None.

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[cloneFrom](ApiProps#clonefrom)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:241

___

### cloudWatchRole

• `Optional` `Readonly` **cloudWatchRole**: false \| true

Automatically configure an AWS CloudWatch role for API Gateway.

**`default`** true

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[cloudWatchRole](ApiProps#cloudwatchrole)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:166

___

### code

• `Optional` **code**: `string` \| `Code`

#### Inherited from

Omit.code

#### Defined in

[src/constructs/Lambda.ts:73](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L73)

___

### codeSigningConfig

• `Optional` `Readonly` **codeSigningConfig**: `ICodeSigningConfig`

Code signing config associated with this function.

**`default`** - Not Sign the Code

**`stability`** stable

#### Inherited from

Omit.codeSigningConfig

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:325

___

### configFile

• `Optional` **configFile**: [`AddConfigFileProps`](../modules#addconfigfileprops)

#### Defined in

[src/stacks/serverless/ServerlessConstruct.ts:17](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/stacks/serverless/ServerlessConstruct.ts#L17)

___

### currentVersionOptions

• `Optional` `Readonly` **currentVersionOptions**: `VersionOptions`

Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method.

**`default`** - default options as described in `VersionOptions`

**`stability`** stable

#### Inherited from

Omit.currentVersionOptions

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:294

___

### deadLetterQueue

• `Optional` `Readonly` **deadLetterQueue**: `IQueue`

The SQS queue to use if DLQ is enabled.

**`default`** - SQS queue with 14 day retention period if `deadLetterQueueEnabled` is `true`

**`stability`** stable

#### Inherited from

Omit.deadLetterQueue

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

Omit.deadLetterQueueEnabled

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:194

___

### defaultCorsPreflightOptions

• `Optional` `Readonly` **defaultCorsPreflightOptions**: `CorsOptions`

Adds a CORS preflight OPTIONS method to this resource and all child resources.

You can add CORS at the resource-level using `addCorsPreflight`.

**`default`** - CORS is disabled

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[defaultCorsPreflightOptions](ApiProps#defaultcorspreflightoptions)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/resource.d.ts:153

___

### defaultIntegration

• `Optional` `Readonly` **defaultIntegration**: `Integration`

An integration to use as a default for all methods created within this API unless an integration is specified.

**`default`** - Inherited from parent.

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[defaultIntegration](ApiProps#defaultintegration)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/resource.d.ts:137

___

### defaultMethodOptions

• `Optional` `Readonly` **defaultMethodOptions**: `MethodOptions`

Method options to use as a default for all methods created within this API unless custom options are specified.

**`default`** - Inherited from parent.

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[defaultMethodOptions](ApiProps#defaultmethodoptions)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/resource.d.ts:144

___

### deploy

• `Optional` `Readonly` **deploy**: false \| true

Indicates if a Deployment should be automatically created for this API, and recreated when the API model (resources, methods) changes.

Since API Gateway deployments are immutable, When this option is enabled
(by default), an AWS::ApiGateway::Deployment resource will automatically
created with a logical ID that hashes the API model (methods, resources
and options). This means that when the model changes, the logical ID of
this CloudFormation resource will change, and a new deployment will be
created.

If this is set, `latestDeployment` will refer to the `Deployment` object
and `deploymentStage` will refer to a `Stage` that points to this
deployment. To customize the stage options, use the `deployOptions`
property.

A CloudFormation Output will also be defined with the root URL endpoint
of this REST API.

**`default`** true

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[deploy](ApiProps#deploy)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:100

___

### deployOptions

• `Optional` `Readonly` **deployOptions**: `StageOptions`

Options for the API Gateway stage that will always point to the latest deployment when `deploy` is enabled.

If `deploy` is disabled,
this value cannot be set.

**`default`** - Based on defaults of `StageOptions`.

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[deployOptions](ApiProps#deployoptions)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:110

___

### description

• `Optional` `Readonly` **description**: `string`

A description of the purpose of this API Gateway RestApi resource.

**`default`** - No description.

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[description](ApiProps#description)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:215

___

### disableExecuteApiEndpoint

• `Optional` `Readonly` **disableExecuteApiEndpoint**: false \| true

Specifies whether clients can invoke the API using the default execute-api endpoint.

To require that clients use a custom domain name to invoke the
API, disable the default endpoint.

**`default`** false

**`see`** https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigateway-restapi.html

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[disableExecuteApiEndpoint](ApiProps#disableexecuteapiendpoint)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:194

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

Omit.document

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/policy.d.ts:103

___

### domainName

• `Optional` `Readonly` **domainName**: `DomainNameOptions`

Configure a custom domain name and map it to this API.

**`default`** - no domain name is defined, use `addDomainName` or directly define a `DomainName`.

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[domainName](ApiProps#domainname)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:159

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

#### Inherited from

Omit.dontOverrideLogicalId

#### Defined in

[src/constructs/Lambda.ts:72](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L72)

___

### encryptionKey

• `Optional` `Readonly` **encryptionKey**: `IKey`

The KMS Key to encrypt the log group with.

**`default`** - log group is encrypted with the default master key

**`stability`** stable

#### Inherited from

Omit.encryptionKey

#### Defined in

node_modules/@aws-cdk/aws-logs/lib/log-group.d.ts:296

___

### endpointConfiguration

• `Optional` `Readonly` **endpointConfiguration**: `EndpointConfiguration`

The EndpointConfiguration property type specifies the endpoint types of a REST API.

**`default`** EndpointType.EDGE

**`see`** https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigateway-restapi-endpointconfiguration.html

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[endpointConfiguration](ApiProps#endpointconfiguration)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:256

___

### endpointExportName

• `Optional` `Readonly` **endpointExportName**: `string`

Export name for the CfnOutput containing the API endpoint.

**`default`** - when no export name is given, output will be created without export

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[endpointExportName](ApiProps#endpointexportname)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:173

___

### endpointTypes

• `Optional` `Readonly` **endpointTypes**: `EndpointType`[]

A list of the endpoint types of the API.

Use this property when creating
an API.

**`default`** EndpointType.EDGE

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[endpointTypes](ApiProps#endpointtypes)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:183

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

Omit.environment

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:82

___

### environmentEncryption

• `Optional` `Readonly` **environmentEncryption**: `IKey`

The AWS KMS key that's used to encrypt your function's environment variables.

**`default`** - AWS Lambda creates and uses an AWS managed customer master key (CMK).

**`stability`** stable

#### Inherited from

Omit.environmentEncryption

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:318

___

### events

• `Optional` **events**: ([`ApiEvent`](ApiEvent) \| `IEventSource`)[]

#### Inherited from

Omit.events

#### Defined in

[src/constructs/Lambda.ts:82](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L82)

___

### existingLogGroups

• `Optional` **existingLogGroups**: `string`[]

#### Inherited from

Omit.existingLogGroups

#### Defined in

[src/constructs/Lambda.ts:84](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L84)

___

### existingTables

• `Optional` **existingTables**: `string`[]

#### Inherited from

Pick.existingTables

#### Defined in

[src/constructs/Tables.ts:44](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Tables.ts#L44)

___

### externalId

• `Optional` `Readonly` **externalId**: `string`

(deprecated) ID that the role assumer needs to provide when assuming this role.

If the configured and provided external IDs do not match, the
AssumeRole operation will fail.

**`default`** No external ID required

**`deprecated`** see [externalIds](LambdaProps#externalids)

#### Inherited from

Omit.externalId

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

Omit.externalIds

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/role.d.ts:44

___

### failOnWarnings

• `Optional` `Readonly` **failOnWarnings**: false \| true

Indicates whether to roll back the resource if a warning occurs while API Gateway is creating the RestApi resource.

**`default`** false

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[failOnWarnings](ApiProps#failonwarnings)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:152

___

### filesystem

• `Optional` `Readonly` **filesystem**: `FileSystem`

The filesystem configuration for the lambda function.

**`default`** - will not mount any filesystem

**`stability`** stable

#### Inherited from

Omit.filesystem

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

Omit.force

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/policy.d.ts:92

___

### gatewayResponses

• `Optional` **gatewayResponses**: `GatewayResponseOptions`[]

#### Inherited from

[ApiProps](ApiProps).[gatewayResponses](ApiProps#gatewayresponses)

#### Defined in

[src/constructs/Api.ts:26](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Api.ts#L26)

___

### groups

• `Optional` `Readonly` **groups**: `IGroup`[]

Groups to attach this policy to.

You can also use `attachToGroup(group)` to attach this policy to a group.

**`default`** - No groups.

**`stability`** stable

#### Inherited from

Omit.groups

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/policy.d.ts:67

___

### initialPolicy

• `Optional` `Readonly` **initialPolicy**: `PolicyStatement`[]

Initial policy statements to add to the created Lambda Role.

You can call `addToRolePolicy` to the created lambda to add statements post creation.

**`default`** - No policy statements are added to the created Lambda role.

**`stability`** stable

#### Inherited from

Omit.initialPolicy

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

Omit.inlinePolicies

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

Omit.insightsVersion

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:232

___

### lambdas

• `Optional` **lambdas**: [`LambdaProps`](LambdaProps)[]

#### Inherited from

Omit.lambdas

#### Defined in

[src/constructs/Lambdas.ts:17](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambdas.ts#L17)

___

### layers

• `Optional` **layers**: (`string` \| `LayerVersion`)[]

#### Inherited from

Omit.layers

#### Defined in

[src/constructs/Lambda.ts:74](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L74)

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

Omit.logRetention

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

Omit.logRetentionRetryOptions

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:287

___

### logRetentionRole

• `Optional` `Readonly` **logRetentionRole**: `IRole`

The IAM role for the Lambda function associated with the custom resource that sets the retention policy.

**`default`** - A new role is created.

**`stability`** stable

#### Inherited from

Omit.logRetentionRole

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:278

___

### loggingLevel

• `Optional` **loggingLevel**: ``"DEBUG"`` \| ``"INFO"`` \| ``"WARNING"`` \| ``"ERROR"`` \| ``"CRITICAL"``

#### Inherited from

Omit.loggingLevel

#### Defined in

[src/constructs/Lambda.ts:78](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L78)

___

### managedPolicies

• `Optional` `Readonly` **managedPolicies**: `IManagedPolicy`[]

A list of managed policies associated with this role.

You can add managed policies later using
`addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName(policyName))`.

**`default`** - No managed policies.

**`stability`** stable

#### Inherited from

Omit.managedPolicies

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

Omit.maxEventAge

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

Omit.maxSessionDuration

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

Omit.memorySize

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:103

___

### minimumCompressionSize

• `Optional` `Readonly` **minimumCompressionSize**: `number`

A nullable integer that is used to enable compression (with non-negative between 0 and 10485760 (10M) bytes, inclusive) or disable compression (when undefined) on an API.

When compression is enabled, compression or
decompression is not applied on the payload if the payload size is
smaller than this value. Setting it to zero allows compression for any
payload size.

**`default`** - Compression is disabled.

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[minimumCompressionSize](ApiProps#minimumcompressionsize)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:234

___

### onFailure

• `Optional` `Readonly` **onFailure**: `IDestination`

The destination for failed invocations.

**`default`** - no destination

**`stability`** stable

#### Inherited from

Omit.onFailure

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/event-invoke-config.d.ts:17

___

### onSuccess

• `Optional` `Readonly` **onSuccess**: `IDestination`

The destination for successful invocations.

**`default`** - no destination

**`stability`** stable

#### Inherited from

Omit.onSuccess

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/event-invoke-config.d.ts:24

___

### parameters

• `Optional` `Readonly` **parameters**: `Object`

Custom header parameters for the request.

**`default`** - No parameters.

**`see`** https://docs.aws.amazon.com/cli/latest/reference/apigateway/import-rest-api.html

**`stability`** stable

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

[ApiProps](ApiProps).[parameters](ApiProps#parameters)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:136

___

### path

• `Optional` `Readonly` **path**: `string`

The path associated with this role.

For information about IAM paths, see
Friendly Names and Paths in IAM User Guide.

**`default`** /

**`stability`** stable

#### Inherited from

Omit.path

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

Omit.permissionsBoundary

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/role.d.ts:92

___

### policy

• `Optional` `Readonly` **policy**: `PolicyDocument`

A policy document that contains the permissions for this RestApi.

**`default`** - No policy.

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[policy](ApiProps#policy)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:145

___

### prefix

• **prefix**: `string`

#### Inherited from

[ApiProps](ApiProps).[prefix](ApiProps#prefix)

#### Defined in

[src/constructs/Api.ts:24](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Api.ts#L24)

___

### profiling

• `Optional` `Readonly` **profiling**: false \| true

Enable profiling.

**`default`** - No profiling.

**`see`** https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html

**`stability`** stable

#### Inherited from

Omit.profiling

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

Omit.profilingGroup

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

Omit.removalPolicy

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

Omit.reservedConcurrentExecutions

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:251

___

### restApiName

• `Optional` `Readonly` **restApiName**: `string`

A name for the API Gateway RestApi resource.

**`default`** - ID of the RestApi construct.

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[restApiName](ApiProps#restapiname)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:128

___

### retainDeployments

• `Optional` `Readonly` **retainDeployments**: false \| true

Retains old deployment resources when the API changes.

This allows
manually reverting stages to point to old deployments via the AWS
Console.

**`default`** false

**`stability`** stable

#### Inherited from

[ApiProps](ApiProps).[retainDeployments](ApiProps#retaindeployments)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:121

___

### retention

• `Optional` `Readonly` **retention**: `ONE_DAY` \| `THREE_DAYS` \| `FIVE_DAYS` \| `ONE_WEEK` \| `TWO_WEEKS` \| `ONE_MONTH` \| `TWO_MONTHS` \| `THREE_MONTHS` \| `FOUR_MONTHS` \| `FIVE_MONTHS` \| `SIX_MONTHS` \| `ONE_YEAR` \| `THIRTEEN_MONTHS` \| `EIGHTEEN_MONTHS` \| `TWO_YEARS` \| `FIVE_YEARS` \| `TEN_YEARS` \| `INFINITE`

How long, in days, the log contents will be retained.

To retain all logs, set this value to RetentionDays.INFINITE.

**`default`** RetentionDays.TWO_YEARS

**`stability`** stable

#### Inherited from

Omit.retention

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

Omit.retryAttempts

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/event-invoke-config.d.ts:44

___

### role

• `Optional` **role**: `string` \| `IRole`

#### Inherited from

Omit.role

#### Defined in

[src/constructs/Lambda.ts:77](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L77)

___

### runtime

• `Optional` **runtime**: `Runtime`

#### Inherited from

Omit.runtime

#### Defined in

[src/constructs/Lambda.ts:75](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L75)

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

Omit.securityGroup

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

Omit.securityGroups

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:174

___

### stage

• **stage**: `string`

#### Inherited from

[ApiProps](ApiProps).[stage](ApiProps#stage)

#### Defined in

[src/constructs/Api.ts:23](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Api.ts#L23)

___

### statements

• `Optional` `Readonly` **statements**: `PolicyStatement`[]

Initial set of permissions to add to this policy document.

You can also use `addStatements(...statement)` to add permissions later.

**`default`** - No statements.

**`stability`** stable

#### Inherited from

Omit.statements

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/policy.d.ts:76

___

### table

• `Optional` **table**: `string` \| `ITable`

**`description`** To add a table to the function, either provide:

`table: Table` OR `table: string and tables: DynamoTables`

When using table as a string will pull the table named the same as the string and associate that with the function.
Supports for backwards compatibility with LambdasAndLogGroups.

#### Inherited from

Omit.table

#### Defined in

[src/constructs/Lambda.ts:96](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L96)

___

### tableEnvKey

• `Optional` **tableEnvKey**: `string`

#### Inherited from

Omit.tableEnvKey

#### Defined in

[src/constructs/Lambda.ts:98](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L98)

___

### tables

• `Optional` **tables**: [`TableProps`](TableProps)[]

#### Inherited from

Pick.tables

#### Defined in

[src/constructs/Tables.ts:43](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Tables.ts#L43)

___

### timeout

• `Optional` `Readonly` **timeout**: `Duration`

The function execution time (in seconds) after which Lambda terminates the function.

Because the execution time affects cost, set this value
based on the function's expected execution time.

**`default`** Duration.seconds(3)

**`stability`** stable

#### Inherited from

Omit.timeout

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:71

___

### tracing

• `Optional` `Readonly` **tracing**: `ACTIVE` \| `PASS_THROUGH` \| `DISABLED`

Enable AWS X-Ray Tracing for Lambda Function.

**`default`** Tracing.Disabled

**`stability`** stable

#### Inherited from

Omit.tracing

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:208

___

### userPool

• `Optional` **userPool**: `IUserPool`

#### Inherited from

[ApiProps](ApiProps).[userPool](ApiProps#userpool)

#### Defined in

[src/constructs/Api.ts:25](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Api.ts#L25)

___

### users

• `Optional` `Readonly` **users**: `IUser`[]

Users to attach this policy to.

You can also use `attachToUser(user)` to attach this policy to a user.

**`default`** - No users.

**`stability`** stable

#### Inherited from

Omit.users

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

Omit.vpc

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

Omit.vpcSubnets

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:149

___

### warmingEvent

• `Optional` **warmingEvent**: `Rule`

#### Inherited from

Omit.warmingEvent

#### Defined in

[src/constructs/Lambda.ts:80](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L80)
