---
id: "ServerlessStackProps"
title: "Interface: ServerlessStackProps"
sidebar_label: "ServerlessStackProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Omit`<`StackProps`, ``"description"``\>

- [`ServerlessConstructProps`](ServerlessConstructProps)

  ↳ **`ServerlessStackProps`**

## Properties

### allowAllOutbound

• `Optional` `Readonly` **allowAllOutbound**: false \| true

Whether to allow the Lambda to send all network traffic.

If set to false, you must individually add traffic rules to allow the
Lambda to connect to network targets.

**`default`** true

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[allowAllOutbound](ServerlessConstructProps#allowalloutbound)

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

[ServerlessConstructProps](ServerlessConstructProps).[allowPublicSubnet](ServerlessConstructProps#allowpublicsubnet)

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:311

___

### analyticsReporting

• `Optional` `Readonly` **analyticsReporting**: false \| true

Include runtime versioning information in this Stack.

**`default`** `analyticsReporting` setting of containing `App`, or value of
'aws:cdk:version-reporting' context key

**`stability`** stable

#### Inherited from

Omit.analyticsReporting

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:126

___

### api

• `Optional` **api**: [`Api`](../classes/Api)

The Api to use with all ApiEvents. If no api is passed it looks at
Stack.of(this).node.tryFindChild('Api') base stack and will use the first
RestApi it finds if one exists.  If no api is passed to the constructor,
nor is there a RestApi resource in the stack, one will be created. It will
be built so all subsequent Lambdas will be able to find and use the same api.

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[api](ServerlessConstructProps#api)

#### Defined in

[src/constructs/Lambda.ts:146](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Lambda.ts#L146)

___

### apiKeySourceType

• `Optional` `Readonly` **apiKeySourceType**: `HEADER` \| `AUTHORIZER`

The source of the API key for metering requests according to a usage plan.

**`default`** - Metering is disabled.

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[apiKeySourceType](ServerlessConstructProps#apikeysourcetype)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:248

___

### architecture

• `Optional` `Readonly` **architecture**: `Architecture`

The system architectures compatible with this lambda function.

**`default`** Architecture.X86_64

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[architecture](ServerlessConstructProps#architecture)

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:339

___

### architectures

• `Optional` `Readonly` **architectures**: `Architecture`[]

(deprecated) DEPRECATED.

**`default`** [Architecture.X86_64]

**`deprecated`** use `architecture`

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[architectures](ServerlessConstructProps#architectures)

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:332

___

### billingMode

• `Optional` `Readonly` **billingMode**: `PAY_PER_REQUEST` \| `PROVISIONED`

Specify how you are charged for read and write throughput and how you manage capacity.

**`default`** PROVISIONED if `replicationRegions` is not specified, PAY_PER_REQUEST otherwise

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[billingMode](ServerlessConstructProps#billingmode)

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:187

___

### binaryMediaTypes

• `Optional` `Readonly` **binaryMediaTypes**: `string`[]

The list of binary media mime-types that are supported by the RestApi resource, such as "image/png" or "application/octet-stream".

**`default`** - RestApi supports only UTF-8-encoded text payloads.

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[binaryMediaTypes](ServerlessConstructProps#binarymediatypes)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:222

___

### buildDevServer

• `Optional` **buildDevServer**: false \| true

Uses `convert-lambda-to-express` to provision a dev server to develop the api.

See [convert-lambda-to-express](https://www.npmjs.com/package/convert-lambda-to-express)
for more information about how to use this feature.

**`default`** true

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[buildDevServer](ServerlessConstructProps#builddevserver)

#### Defined in

[src/constructs/Api.ts:71](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L71)

___

### canInvoke

• `Optional` **canInvoke**: (`string` \| `IRole` \| `PrincipalBase`)[]

Array of principals that can invoke the lambda. Can pass a string arn, an IRole, or any Principal construct
and will create the AWS::Lambda::Permission for you.

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[canInvoke](ServerlessConstructProps#caninvoke)

#### Defined in

[src/constructs/Lambda.ts:111](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Lambda.ts#L111)

___

### cloneFrom

• `Optional` `Readonly` **cloneFrom**: `IRestApi`

The ID of the API Gateway RestApi resource that you want to clone.

**`default`** - None.

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[cloneFrom](ServerlessConstructProps#clonefrom)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:241

___

### cloudWatchRole

• `Optional` `Readonly` **cloudWatchRole**: false \| true

Automatically configure an AWS CloudWatch role for API Gateway.

**`default`** true

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[cloudWatchRole](ServerlessConstructProps#cloudwatchrole)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:166

___

### code

• `Optional` **code**: `string` \| `Code`

Code to use with all lambdas in this group.  Can pass a string to the
absolute path of the code folder and the AssetCode will be created for
you.  You can also pass in any Construct that extends Code ie:
InlineCode, AssetCode, S3Code, etc.

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[code](ServerlessConstructProps#code)

#### Defined in

[src/constructs/Lambdas.ts:56](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Lambdas.ts#L56)

___

### codeSigningConfig

• `Optional` `Readonly` **codeSigningConfig**: `ICodeSigningConfig`

Code signing config associated with this function.

**`default`** - Not Sign the Code

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[codeSigningConfig](ServerlessConstructProps#codesigningconfig)

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:325

___

### contributorInsightsEnabled

• `Optional` `Readonly` **contributorInsightsEnabled**: false \| true

Whether CloudWatch contributor insights is enabled.

**`default`** false

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[contributorInsightsEnabled](ServerlessConstructProps#contributorinsightsenabled)

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:282

___

### currentVersionOptions

• `Optional` `Readonly` **currentVersionOptions**: `VersionOptions`

Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method.

**`default`** - default options as described in `VersionOptions`

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[currentVersionOptions](ServerlessConstructProps#currentversionoptions)

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:294

___

### deadLetterQueue

• `Optional` `Readonly` **deadLetterQueue**: `IQueue`

The SQS queue to use if DLQ is enabled.

**`default`** - SQS queue with 14 day retention period if `deadLetterQueueEnabled` is `true`

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[deadLetterQueue](ServerlessConstructProps#deadletterqueue)

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

[ServerlessConstructProps](ServerlessConstructProps).[deadLetterQueueEnabled](ServerlessConstructProps#deadletterqueueenabled)

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

[ServerlessConstructProps](ServerlessConstructProps).[defaultCorsPreflightOptions](ServerlessConstructProps#defaultcorspreflightoptions)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/resource.d.ts:153

___

### defaultIntegration

• `Optional` `Readonly` **defaultIntegration**: `Integration`

An integration to use as a default for all methods created within this API unless an integration is specified.

**`default`** - Inherited from parent.

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[defaultIntegration](ServerlessConstructProps#defaultintegration)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/resource.d.ts:137

___

### defaultMethodOptions

• `Optional` `Readonly` **defaultMethodOptions**: `MethodOptions`

Method options to use as a default for all methods created within this API unless custom options are specified.

**`default`** - Inherited from parent.

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[defaultMethodOptions](ServerlessConstructProps#defaultmethodoptions)

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

[ServerlessConstructProps](ServerlessConstructProps).[deploy](ServerlessConstructProps#deploy)

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

[ServerlessConstructProps](ServerlessConstructProps).[deployOptions](ServerlessConstructProps#deployoptions)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:110

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

[ServerlessConstructProps](ServerlessConstructProps).[disableExecuteApiEndpoint](ServerlessConstructProps#disableexecuteapiendpoint)

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

[ServerlessConstructProps](ServerlessConstructProps).[document](ServerlessConstructProps#document)

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/policy.d.ts:103

___

### domainName

• `Optional` `Readonly` **domainName**: `DomainNameOptions`

Configure a custom domain name and map it to this API.

**`default`** - no domain name is defined, use `addDomainName` or directly define a `DomainName`.

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[domainName](ServerlessConstructProps#domainname)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:159

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

Option to not use fixed logicalId's for the RestApi resource. For more
info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[dontOverrideLogicalId](ServerlessConstructProps#dontoverridelogicalid)

#### Defined in

[src/constructs/Api.ts:83](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L83)

___

### encryption

• `Optional` `Readonly` **encryption**: `DEFAULT` \| `CUSTOMER_MANAGED` \| `AWS_MANAGED`

Whether server-side encryption with an AWS managed customer master key is enabled.

This property cannot be set if `serverSideEncryption` is set.

**`default`** - server-side encryption is enabled with an AWS owned customer master key

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[encryption](ServerlessConstructProps#encryption)

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:213

___

### encryptionKey

• `Optional` `Readonly` **encryptionKey**: `IKey`

External KMS key to use for table encryption.

This property can only be set if `encryption` is set to `TableEncryption.CUSTOMER_MANAGED`.

**`default`** - If `encryption` is set to `TableEncryption.CUSTOMER_MANAGED` and this
property is undefined, a new KMS key will be created and associated with this table.

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[encryptionKey](ServerlessConstructProps#encryptionkey)

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:223

___

### endpointConfiguration

• `Optional` `Readonly` **endpointConfiguration**: `EndpointConfiguration`

The EndpointConfiguration property type specifies the endpoint types of a REST API.

**`default`** EndpointType.EDGE

**`see`** https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigateway-restapi-endpointconfiguration.html

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[endpointConfiguration](ServerlessConstructProps#endpointconfiguration)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:256

___

### endpointExportName

• `Optional` `Readonly` **endpointExportName**: `string`

Export name for the CfnOutput containing the API endpoint.

**`default`** - when no export name is given, output will be created without export

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[endpointExportName](ServerlessConstructProps#endpointexportname)

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

[ServerlessConstructProps](ServerlessConstructProps).[endpointTypes](ServerlessConstructProps#endpointtypes)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:183

___

### env

• `Optional` `Readonly` **env**: `Environment`

The AWS environment (account/region) where this stack will be deployed.

Set the `region`/`account` fields of `env` to either a concrete value to
select the indicated environment (recommended for production stacks), or to
the values of environment variables
`CDK_DEFAULT_REGION`/`CDK_DEFAULT_ACCOUNT` to let the target environment
depend on the AWS credentials/configuration that the CDK CLI is executed
under (recommended for development stacks).

If the `Stack` is instantiated inside a `Stage`, any undefined
`region`/`account` fields from `env` will default to the same field on the
encompassing `Stage`, if configured there.

If either `region` or `account` are not set nor inherited from `Stage`, the
Stack will be considered "*environment-agnostic*"". Environment-agnostic
stacks can be deployed to any environment but may not be able to take
advantage of all features of the CDK. For example, they will not be able to
use environmental context lookups such as `ec2.Vpc.fromLookup` and will not
automatically translate Service Principals to the right format based on the
environment's AWS partition, and other such enhancements.

**`default`** - The environment of the containing `Stage` if available,
otherwise create the stack will be environment-agnostic.

**`stability`** stable

**`example`**

// Use a concrete account and region to deploy this stack to:
// `.account` and `.region` will simply return these values.
new Stack(app, 'Stack1', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  },
});

// Use the CLI's current credentials to determine the target environment:
// `.account` and `.region` will reflect the account+region the CLI
// is configured to use (based on the user CLI credentials)
new Stack(app, 'Stack2', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
});

// Define multiple stacks stage associated with an environment
const myStage = new Stage(app, 'MyStage', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  }
});

// both of these stacks will use the stage's account/region:
// `.account` and `.region` will resolve to the concrete values as above
new MyStack(myStage, 'Stack1');
new YourStack(myStage, 'Stack2');

// Define an environment-agnostic stack:
// `.account` and `.region` will resolve to `{ "Ref": "AWS::AccountId" }` and `{ "Ref": "AWS::Region" }` respectively.
// which will only resolve to actual values by CloudFormation during deployment.
new MyStack(app, 'Stack1');

#### Inherited from

Omit.env

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:87

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

[ServerlessConstructProps](ServerlessConstructProps).[environment](ServerlessConstructProps#environment)

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:82

___

### environmentEncryption

• `Optional` `Readonly` **environmentEncryption**: `IKey`

The AWS KMS key that's used to encrypt your function's environment variables.

**`default`** - AWS Lambda creates and uses an AWS managed customer master key (CMK).

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[environmentEncryption](ServerlessConstructProps#environmentencryption)

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

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[events](ServerlessConstructProps#events)

#### Defined in

[src/constructs/Lambda.ts:137](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Lambda.ts#L137)

___

### existingLogGroups

• `Optional` **existingLogGroups**: `string`[]

Handy feature to plug into existing logGroups.  Pass an array of strings
that are the logGroup names in the target account and any log groups that
exist will not be created. ie no thrown errors, and stack rollbacks, for
log groups that exist

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[existingLogGroups](ServerlessConstructProps#existingloggroups)

#### Defined in

[src/constructs/Lambda.ts:154](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Lambda.ts#L154)

___

### externalId

• `Optional` `Readonly` **externalId**: `string`

(deprecated) ID that the role assumer needs to provide when assuming this role.

If the configured and provided external IDs do not match, the
AssumeRole operation will fail.

**`default`** No external ID required

**`deprecated`** see [externalIds](LambdaProps#externalids)

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[externalId](ServerlessConstructProps#externalid)

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

[ServerlessConstructProps](ServerlessConstructProps).[externalIds](ServerlessConstructProps#externalids)

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/role.d.ts:44

___

### failOnWarnings

• `Optional` `Readonly` **failOnWarnings**: false \| true

Indicates whether to roll back the resource if a warning occurs while API Gateway is creating the RestApi resource.

**`default`** false

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[failOnWarnings](ServerlessConstructProps#failonwarnings)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:152

___

### filesystem

• `Optional` `Readonly` **filesystem**: `FileSystem`

The filesystem configuration for the lambda function.

**`default`** - will not mount any filesystem

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[filesystem](ServerlessConstructProps#filesystem)

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

[ServerlessConstructProps](ServerlessConstructProps).[force](ServerlessConstructProps#force)

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/policy.d.ts:92

___

### gatewayResponses

• `Optional` **gatewayResponses**: `GatewayResponseOptions`[]

Gateway responses to add to the api. By default the following responses are added:
{ type: ResponseType.UNAUTHORIZED, statusCode: '401' }
{ type: ResponseType.ACCESS_DENIED, statusCode: '403' }
{ type: ResponseType.RESOURCE_NOT_FOUND, statusCode: '404' }
{ type: ResponseType.DEFAULT_5XX, statusCode: '500' }

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[gatewayResponses](ServerlessConstructProps#gatewayresponses)

#### Defined in

[src/constructs/Api.ts:61](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L61)

___

### groups

• `Optional` `Readonly` **groups**: `IGroup`[]

Groups to attach this policy to.

You can also use `attachToGroup(group)` to attach this policy to a group.

**`default`** - No groups.

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[groups](ServerlessConstructProps#groups)

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

[ServerlessConstructProps](ServerlessConstructProps).[initialPolicy](ServerlessConstructProps#initialpolicy)

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

[ServerlessConstructProps](ServerlessConstructProps).[inlinePolicies](ServerlessConstructProps#inlinepolicies)

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

[ServerlessConstructProps](ServerlessConstructProps).[insightsVersion](ServerlessConstructProps#insightsversion)

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:232

___

### kinesisStream

• `Optional` `Readonly` **kinesisStream**: `IStream`

Kinesis Data Stream to capture item-level changes for the table.

**`default`** - no Kinesis Data Stream

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[kinesisStream](ServerlessConstructProps#kinesisstream)

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:303

___

### lambdas

• `Optional` **lambdas**: `LambdasPropsOptionalRuntimeAndCode`[]

An array of LambdaProps objects where the `runtime` and `code` are optional
While technically required they can be optionally passed as shared props and
that will get merged with each set of individual props and creation time.

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[lambdas](ServerlessConstructProps#lambdas)

#### Defined in

[src/constructs/Lambdas.ts:43](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Lambdas.ts#L43)

___

### layers

• `Optional` **layers**: (`string` \| `LayerVersion`)[]

LayerVersions to use with the lambda.  Can pass in a strings, that are absolute path to the layer folder,
and the AssetCode will be made for the directory.  Can also pass in an array of LayerVersion constructs.

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[layers](ServerlessConstructProps#layers)

#### Defined in

[src/constructs/Lambda.ts:100](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Lambda.ts#L100)

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

[ServerlessConstructProps](ServerlessConstructProps).[logRetention](ServerlessConstructProps#logretention)

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

[ServerlessConstructProps](ServerlessConstructProps).[logRetentionRetryOptions](ServerlessConstructProps#logretentionretryoptions)

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:287

___

### logRetentionRole

• `Optional` `Readonly` **logRetentionRole**: `IRole`

The IAM role for the Lambda function associated with the custom resource that sets the retention policy.

**`default`** - A new role is created.

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[logRetentionRole](ServerlessConstructProps#logretentionrole)

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:278

___

### loggingLevel

• `Optional` **loggingLevel**: ``"DEBUG"`` \| ``"INFO"`` \| ``"WARNING"`` \| ``"ERROR"`` \| ``"CRITICAL"``

Adds process.env.LOGGING_LEVEL to the lambda environment. Can be set to:
'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL'

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[loggingLevel](ServerlessConstructProps#logginglevel)

#### Defined in

[src/constructs/Lambda.ts:125](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Lambda.ts#L125)

___

### logicalId

• `Optional` **logicalId**: `string`

LogicalId for the RestApi resource for in-place upgrades. For more
info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[logicalId](ServerlessConstructProps#logicalid)

#### Defined in

[src/constructs/Api.ts:77](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L77)

___

### managedPolicies

• `Optional` `Readonly` **managedPolicies**: `IManagedPolicy`[]

A list of managed policies associated with this role.

You can add managed policies later using
`addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName(policyName))`.

**`default`** - No managed policies.

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[managedPolicies](ServerlessConstructProps#managedpolicies)

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

[ServerlessConstructProps](ServerlessConstructProps).[maxEventAge](ServerlessConstructProps#maxeventage)

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

[ServerlessConstructProps](ServerlessConstructProps).[maxSessionDuration](ServerlessConstructProps#maxsessionduration)

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

[ServerlessConstructProps](ServerlessConstructProps).[memorySize](ServerlessConstructProps#memorysize)

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

[ServerlessConstructProps](ServerlessConstructProps).[minimumCompressionSize](ServerlessConstructProps#minimumcompressionsize)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:234

___

### name

• `Optional` **name**: `string`

The name of the api. If `prefix` and `name` are provided then the
apiName will be `${prefix}-${name}`.  If no prefix is provided then
the apiName will be `name`

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[name](ServerlessConstructProps#name)

#### Defined in

[src/constructs/Api.ts:37](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L37)

___

### onFailure

• `Optional` `Readonly` **onFailure**: `IDestination`

The destination for failed invocations.

**`default`** - no destination

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[onFailure](ServerlessConstructProps#onfailure)

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/event-invoke-config.d.ts:17

___

### onSuccess

• `Optional` `Readonly` **onSuccess**: `IDestination`

The destination for successful invocations.

**`default`** - no destination

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[onSuccess](ServerlessConstructProps#onsuccess)

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

[ServerlessConstructProps](ServerlessConstructProps).[parameters](ServerlessConstructProps#parameters)

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

[ServerlessConstructProps](ServerlessConstructProps).[path](ServerlessConstructProps#path)

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

[ServerlessConstructProps](ServerlessConstructProps).[permissionsBoundary](ServerlessConstructProps#permissionsboundary)

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/role.d.ts:92

___

### pointInTimeRecovery

• `Optional` `Readonly` **pointInTimeRecovery**: false \| true

Whether point-in-time recovery is enabled.

**`default`** - point-in-time recovery is disabled

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[pointInTimeRecovery](ServerlessConstructProps#pointintimerecovery)

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:194

___

### policy

• `Optional` `Readonly` **policy**: `PolicyDocument`

A policy document that contains the permissions for this RestApi.

**`default`** - No policy.

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[policy](ServerlessConstructProps#policy)

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:145

___

### prefix

• `Optional` **prefix**: `string`

The prefix to use with resource names. If `prefix` and `name` are
provided then the apiName will be `${prefix}-${name}`.  If no name
is provided then the apiName will be `prefix`. For more info, see
[Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[prefix](ServerlessConstructProps#prefix)

#### Defined in

[src/constructs/Api.ts:45](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L45)

___

### profiling

• `Optional` `Readonly` **profiling**: false \| true

Enable profiling.

**`default`** - No profiling.

**`see`** https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[profiling](ServerlessConstructProps#profiling)

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

[ServerlessConstructProps](ServerlessConstructProps).[profilingGroup](ServerlessConstructProps#profilinggroup)

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:224

___

### readCapacity

• `Optional` `Readonly` **readCapacity**: `number`

The read capacity for the table.

Careful if you add Global Secondary Indexes, as
those will share the table's provisioned throughput.

Can only be provided if billingMode is Provisioned.

**`default`** 5

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[readCapacity](ServerlessConstructProps#readcapacity)

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:168

___

### removalPolicy

• `Optional` `Readonly` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

The removal policy to apply to the DynamoDB Table.

**`default`** RemovalPolicy.RETAIN

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[removalPolicy](ServerlessConstructProps#removalpolicy)

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:244

___

### replicationRegions

• `Optional` `Readonly` **replicationRegions**: `string`[]

Regions where replica tables will be created.

**`default`** - no replica tables are created

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[replicationRegions](ServerlessConstructProps#replicationregions)

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:251

___

### replicationTimeout

• `Optional` `Readonly` **replicationTimeout**: `Duration`

The timeout for a table replication operation in a single region.

**`default`** Duration.minutes(30)

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[replicationTimeout](ServerlessConstructProps#replicationtimeout)

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:258

___

### reservedConcurrentExecutions

• `Optional` `Readonly` **reservedConcurrentExecutions**: `number`

The maximum of concurrent executions you want to reserve for the function.

**`default`** - No specific limit - account limit.

**`see`** https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[reservedConcurrentExecutions](ServerlessConstructProps#reservedconcurrentexecutions)

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:251

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

[ServerlessConstructProps](ServerlessConstructProps).[retainDeployments](ServerlessConstructProps#retaindeployments)

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

[ServerlessConstructProps](ServerlessConstructProps).[retention](ServerlessConstructProps#retention)

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

[ServerlessConstructProps](ServerlessConstructProps).[retryAttempts](ServerlessConstructProps#retryattempts)

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/event-invoke-config.d.ts:44

___

### role

• `Optional` **role**: `string` \| `IRole`

The IRole or arn of the service role. If a LambdaProps.role is passed no IAM will be created

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[role](ServerlessConstructProps#role)

#### Defined in

[src/constructs/Lambda.ts:105](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Lambda.ts#L105)

___

### runtime

• `Optional` **runtime**: `Runtime`

Runtime to use with all lambdas in this group.

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[runtime](ServerlessConstructProps#runtime)

#### Defined in

[src/constructs/Lambdas.ts:48](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Lambdas.ts#L48)

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

[ServerlessConstructProps](ServerlessConstructProps).[securityGroup](ServerlessConstructProps#securitygroup)

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

[ServerlessConstructProps](ServerlessConstructProps).[securityGroups](ServerlessConstructProps#securitygroups)

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:174

___

### serverSideEncryption

• `Optional` `Readonly` **serverSideEncryption**: false \| true

(deprecated) Whether server-side encryption with an AWS managed customer master key is enabled.

This property cannot be set if `encryption` and/or `encryptionKey` is set.

**`default`** - server-side encryption is enabled with an AWS owned customer master key

**`deprecated`** This property is deprecated. In order to obtain the same behavior as
enabling this, set the `encryption` property to `TableEncryption.AWS_MANAGED` instead.

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[serverSideEncryption](ServerlessConstructProps#serversideencryption)

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:204

___

### stackName

• `Optional` `Readonly` **stackName**: `string`

Name to deploy the stack with.

**`default`** - Derived from construct path.

**`stability`** stable

#### Inherited from

Omit.stackName

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:94

___

### stage

• `Optional` **stage**: `string`

The api stage name. This is an alias to the deployOptions.stageName.

**`default`** "prod"

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[stage](ServerlessConstructProps#stage)

#### Defined in

[src/constructs/Api.ts:30](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L30)

___

### statements

• `Optional` `Readonly` **statements**: `PolicyStatement`[]

Initial set of permissions to add to this policy document.

You can also use `addStatements(...statement)` to add permissions later.

**`default`** - No statements.

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[statements](ServerlessConstructProps#statements)

#### Defined in

node_modules/@aws-cdk/aws-iam/lib/policy.d.ts:76

___

### stream

• `Optional` `Readonly` **stream**: `NEW_IMAGE` \| `OLD_IMAGE` \| `NEW_AND_OLD_IMAGES` \| `KEYS_ONLY`

When an item in the table is modified, StreamViewType determines what information is written to the stream for this table.

**`default`** - streams are disabled unless `replicationRegions` is specified

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[stream](ServerlessConstructProps#stream)

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:237

___

### synthesizer

• `Optional` `Readonly` **synthesizer**: `IStackSynthesizer`

Synthesis method to use while deploying this stack.

**`default`** - `DefaultStackSynthesizer` if the `@aws-cdk/core:newStyleStackSynthesis` feature flag
is set, `LegacyStackSynthesizer` otherwise.

**`stability`** stable

#### Inherited from

Omit.synthesizer

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:111

___

### table

• `Optional` **table**: `string` \| `ITable`

Associates a table with the lambda function.  Can be passed as a Table or
a string. When using a string must also pass a Tables object to the
`tables` prop.  This is mostly a convention for use with the Lambdas and
Tables constructs so its easier to created the lambda definitions.  See
the LambdasProps.tables for more information.

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[table](ServerlessConstructProps#table)

#### Defined in

[src/constructs/Lambda.ts:163](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Lambda.ts#L163)

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

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[tableEnvKey](ServerlessConstructProps#tableenvkey)

#### Defined in

[src/constructs/Lambda.ts:184](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Lambda.ts#L184)

___

### tables

• `Optional` **tables**: `TableProps`[]

Array of tablesProps to use for creation of multiple tables.

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[tables](ServerlessConstructProps#tables)

#### Defined in

[src/constructs/Tables.ts:25](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Tables.ts#L25)

___

### tags

• `Optional` `Readonly` **tags**: `Object`

Stack tags that will be applied to all the taggable resources and the stack itself.

**`default`** {}

**`stability`** stable

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

Omit.tags

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:101

___

### terminationProtection

• `Optional` `Readonly` **terminationProtection**: false \| true

Whether to enable termination protection for this stack.

**`default`** false

**`stability`** stable

#### Inherited from

Omit.terminationProtection

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:118

___

### timeToLiveAttribute

• `Optional` `Readonly` **timeToLiveAttribute**: `string`

The name of TTL attribute.

**`default`** - TTL is disabled

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[timeToLiveAttribute](ServerlessConstructProps#timetoliveattribute)

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:230

___

### timeout

• `Optional` `Readonly` **timeout**: `Duration`

The function execution time (in seconds) after which Lambda terminates the function.

Because the execution time affects cost, set this value
based on the function's expected execution time.

**`default`** Duration.seconds(3)

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[timeout](ServerlessConstructProps#timeout)

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:71

___

### tracing

• `Optional` `Readonly` **tracing**: `ACTIVE` \| `PASS_THROUGH` \| `DISABLED`

Enable AWS X-Ray Tracing for Lambda Function.

**`default`** Tracing.Disabled

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[tracing](ServerlessConstructProps#tracing)

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:208

___

### userPool

• `Optional` **userPool**: `IUserPool`

UserPool to create a gateway authorizer.  It is not required to be added
when running the constructor.  Can also add a cognito authorizer with
the api.attachCognitoAuthorizer() method

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[userPool](ServerlessConstructProps#userpool)

#### Defined in

[src/constructs/Api.ts:52](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L52)

___

### users

• `Optional` `Readonly` **users**: `IUser`[]

Users to attach this policy to.

You can also use `attachToUser(user)` to attach this policy to a user.

**`default`** - No users.

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[users](ServerlessConstructProps#users)

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

[ServerlessConstructProps](ServerlessConstructProps).[vpc](ServerlessConstructProps#vpc)

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

[ServerlessConstructProps](ServerlessConstructProps).[vpcSubnets](ServerlessConstructProps#vpcsubnets)

#### Defined in

node_modules/@aws-cdk/aws-lambda/lib/function.d.ts:149

___

### waitForReplicationToFinish

• `Optional` `Readonly` **waitForReplicationToFinish**: false \| true

Indicates whether CloudFormation stack waits for replication to finish.

If set to false, the CloudFormation resource will mark the resource as
created and replication will be completed asynchronously. This property is
ignored if replicationRegions property is not set.

DO NOT UNSET this property if adding/removing multiple replicationRegions
in one deployment, as CloudFormation only supports one region replication
at a time. CDK overcomes this limitation by waiting for replication to
finish before starting new replicationRegion.

**`default`** true

**`see`** https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-globaltable.html#cfn-dynamodb-globaltable-replicas

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[waitForReplicationToFinish](ServerlessConstructProps#waitforreplicationtofinish)

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:275

___

### warmingEvent

• `Optional` **warmingEvent**: `Rule`

simplifies warming the function. Timing will be base by the Rule that gets
passed.  Event will emit the { warmer: true } object to the function

code can easily check for warming event and return early

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[warmingEvent](ServerlessConstructProps#warmingevent)

#### Defined in

[src/constructs/Lambda.ts:119](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Lambda.ts#L119)

___

### writeCapacity

• `Optional` `Readonly` **writeCapacity**: `number`

The write capacity for the table.

Careful if you add Global Secondary Indexes, as
those will share the table's provisioned throughput.

Can only be provided if billingMode is Provisioned.

**`default`** 5

**`stability`** stable

#### Inherited from

[ServerlessConstructProps](ServerlessConstructProps).[writeCapacity](ServerlessConstructProps#writecapacity)

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:180
