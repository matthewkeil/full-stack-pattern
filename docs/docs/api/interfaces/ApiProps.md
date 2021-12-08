---
id: "ApiProps"
title: "Interface: ApiProps"
sidebar_label: "ApiProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Mutable`](../modules#mutable)<`Omit`<`RestApiProps`, ``"restApiName"``\>\>

  ↳ **`ApiProps`**

## Properties

### apiKeySourceType

• `Optional` `Readonly` **apiKeySourceType**: `HEADER` \| `AUTHORIZER`

The source of the API key for metering requests according to a usage plan.

**`default`** - Metering is disabled.

**`stability`** stable

#### Inherited from

Mutable.apiKeySourceType

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:248

___

### binaryMediaTypes

• `Optional` `Readonly` **binaryMediaTypes**: `string`[]

The list of binary media mime-types that are supported by the RestApi resource, such as "image/png" or "application/octet-stream".

**`default`** - RestApi supports only UTF-8-encoded text payloads.

**`stability`** stable

#### Inherited from

Mutable.binaryMediaTypes

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:222

___

### buildDevServer

• `Optional` **buildDevServer**: false \| true

Uses `convert-lambda-to-express` to provision a dev server to develop the api.

See [convert-lambda-to-express](https://www.npmjs.com/package/convert-lambda-to-express)
for more information about how to use this feature.

**`default`** true

#### Defined in

[src/constructs/Api.ts:71](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L71)

___

### cloneFrom

• `Optional` `Readonly` **cloneFrom**: `IRestApi`

The ID of the API Gateway RestApi resource that you want to clone.

**`default`** - None.

**`stability`** stable

#### Inherited from

Mutable.cloneFrom

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:241

___

### cloudWatchRole

• `Optional` `Readonly` **cloudWatchRole**: false \| true

Automatically configure an AWS CloudWatch role for API Gateway.

**`default`** true

**`stability`** stable

#### Inherited from

Mutable.cloudWatchRole

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:166

___

### defaultCorsPreflightOptions

• `Optional` `Readonly` **defaultCorsPreflightOptions**: `CorsOptions`

Adds a CORS preflight OPTIONS method to this resource and all child resources.

You can add CORS at the resource-level using `addCorsPreflight`.

**`default`** - CORS is disabled

**`stability`** stable

#### Inherited from

Mutable.defaultCorsPreflightOptions

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/resource.d.ts:153

___

### defaultIntegration

• `Optional` `Readonly` **defaultIntegration**: `Integration`

An integration to use as a default for all methods created within this API unless an integration is specified.

**`default`** - Inherited from parent.

**`stability`** stable

#### Inherited from

Mutable.defaultIntegration

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/resource.d.ts:137

___

### defaultMethodOptions

• `Optional` `Readonly` **defaultMethodOptions**: `MethodOptions`

Method options to use as a default for all methods created within this API unless custom options are specified.

**`default`** - Inherited from parent.

**`stability`** stable

#### Inherited from

Mutable.defaultMethodOptions

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

Mutable.deploy

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

Mutable.deployOptions

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:110

___

### description

• `Optional` `Readonly` **description**: `string`

A description of the purpose of this API Gateway RestApi resource.

**`default`** - No description.

**`stability`** stable

#### Inherited from

Mutable.description

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

Mutable.disableExecuteApiEndpoint

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:194

___

### domainName

• `Optional` `Readonly` **domainName**: `DomainNameOptions`

Configure a custom domain name and map it to this API.

**`default`** - no domain name is defined, use `addDomainName` or directly define a `DomainName`.

**`stability`** stable

#### Inherited from

Mutable.domainName

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:159

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

Option to not use fixed logicalId's for the RestApi resource. For more
info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Defined in

[src/constructs/Api.ts:83](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L83)

___

### endpointConfiguration

• `Optional` `Readonly` **endpointConfiguration**: `EndpointConfiguration`

The EndpointConfiguration property type specifies the endpoint types of a REST API.

**`default`** EndpointType.EDGE

**`see`** https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigateway-restapi-endpointconfiguration.html

**`stability`** stable

#### Inherited from

Mutable.endpointConfiguration

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:256

___

### endpointExportName

• `Optional` `Readonly` **endpointExportName**: `string`

Export name for the CfnOutput containing the API endpoint.

**`default`** - when no export name is given, output will be created without export

**`stability`** stable

#### Inherited from

Mutable.endpointExportName

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

Mutable.endpointTypes

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:183

___

### failOnWarnings

• `Optional` `Readonly` **failOnWarnings**: false \| true

Indicates whether to roll back the resource if a warning occurs while API Gateway is creating the RestApi resource.

**`default`** false

**`stability`** stable

#### Inherited from

Mutable.failOnWarnings

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:152

___

### gatewayResponses

• `Optional` **gatewayResponses**: `GatewayResponseOptions`[]

Gateway responses to add to the api. By default the following responses are added:
{ type: ResponseType.UNAUTHORIZED, statusCode: '401' }
{ type: ResponseType.ACCESS_DENIED, statusCode: '403' }
{ type: ResponseType.RESOURCE_NOT_FOUND, statusCode: '404' }
{ type: ResponseType.DEFAULT_5XX, statusCode: '500' }

#### Defined in

[src/constructs/Api.ts:61](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L61)

___

### logicalId

• `Optional` **logicalId**: `string`

LogicalId for the RestApi resource for in-place upgrades. For more
info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Defined in

[src/constructs/Api.ts:77](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L77)

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

Mutable.minimumCompressionSize

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:234

___

### name

• `Optional` **name**: `string`

The name of the api. If `prefix` and `name` are provided then the
apiName will be `${prefix}-${name}`.  If no prefix is provided then
the apiName will be `name`

#### Defined in

[src/constructs/Api.ts:37](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L37)

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

Mutable.parameters

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:136

___

### policy

• `Optional` `Readonly` **policy**: `PolicyDocument`

A policy document that contains the permissions for this RestApi.

**`default`** - No policy.

**`stability`** stable

#### Inherited from

Mutable.policy

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:145

___

### prefix

• `Optional` **prefix**: `string`

The prefix to use with resource names. If `prefix` and `name` are
provided then the apiName will be `${prefix}-${name}`.  If no name
is provided then the apiName will be `prefix`. For more info, see
[Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Defined in

[src/constructs/Api.ts:45](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L45)

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

Mutable.retainDeployments

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:121

___

### stage

• `Optional` **stage**: `string`

The api stage name. This is an alias to the deployOptions.stageName.

**`default`** "prod"

#### Defined in

[src/constructs/Api.ts:30](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L30)

___

### userPool

• `Optional` **userPool**: `IUserPool`

UserPool to create a gateway authorizer.  It is not required to be added
when running the constructor.  Can also add a cognito authorizer with
the api.attachCognitoAuthorizer() method

#### Defined in

[src/constructs/Api.ts:52](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L52)
