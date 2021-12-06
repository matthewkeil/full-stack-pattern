---
id: "ApiProps"
title: "Interface: ApiProps"
sidebar_label: "ApiProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `RestApiProps`

  ↳ **`ApiProps`**

  ↳↳ [`ServerlessConstructProps`](ServerlessConstructProps)

## Properties

### apiKeySourceType

• `Optional` `Readonly` **apiKeySourceType**: `HEADER` \| `AUTHORIZER`

The source of the API key for metering requests according to a usage plan.

**`default`** - Metering is disabled.

**`stability`** stable

#### Inherited from

RestApiProps.apiKeySourceType

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:248

___

### binaryMediaTypes

• `Optional` `Readonly` **binaryMediaTypes**: `string`[]

The list of binary media mime-types that are supported by the RestApi resource, such as "image/png" or "application/octet-stream".

**`default`** - RestApi supports only UTF-8-encoded text payloads.

**`stability`** stable

#### Inherited from

RestApiProps.binaryMediaTypes

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:222

___

### cloneFrom

• `Optional` `Readonly` **cloneFrom**: `IRestApi`

The ID of the API Gateway RestApi resource that you want to clone.

**`default`** - None.

**`stability`** stable

#### Inherited from

RestApiProps.cloneFrom

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:241

___

### cloudWatchRole

• `Optional` `Readonly` **cloudWatchRole**: false \| true

Automatically configure an AWS CloudWatch role for API Gateway.

**`default`** true

**`stability`** stable

#### Inherited from

RestApiProps.cloudWatchRole

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

RestApiProps.defaultCorsPreflightOptions

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/resource.d.ts:153

___

### defaultIntegration

• `Optional` `Readonly` **defaultIntegration**: `Integration`

An integration to use as a default for all methods created within this API unless an integration is specified.

**`default`** - Inherited from parent.

**`stability`** stable

#### Inherited from

RestApiProps.defaultIntegration

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/resource.d.ts:137

___

### defaultMethodOptions

• `Optional` `Readonly` **defaultMethodOptions**: `MethodOptions`

Method options to use as a default for all methods created within this API unless custom options are specified.

**`default`** - Inherited from parent.

**`stability`** stable

#### Inherited from

RestApiProps.defaultMethodOptions

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

RestApiProps.deploy

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

RestApiProps.deployOptions

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:110

___

### description

• `Optional` `Readonly` **description**: `string`

A description of the purpose of this API Gateway RestApi resource.

**`default`** - No description.

**`stability`** stable

#### Inherited from

RestApiProps.description

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

RestApiProps.disableExecuteApiEndpoint

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:194

___

### domainName

• `Optional` `Readonly` **domainName**: `DomainNameOptions`

Configure a custom domain name and map it to this API.

**`default`** - no domain name is defined, use `addDomainName` or directly define a `DomainName`.

**`stability`** stable

#### Inherited from

RestApiProps.domainName

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:159

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

#### Defined in

[src/constructs/Api.ts:29](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/constructs/Api.ts#L29)

___

### endpointConfiguration

• `Optional` `Readonly` **endpointConfiguration**: `EndpointConfiguration`

The EndpointConfiguration property type specifies the endpoint types of a REST API.

**`default`** EndpointType.EDGE

**`see`** https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-apigateway-restapi-endpointconfiguration.html

**`stability`** stable

#### Inherited from

RestApiProps.endpointConfiguration

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:256

___

### endpointExportName

• `Optional` `Readonly` **endpointExportName**: `string`

Export name for the CfnOutput containing the API endpoint.

**`default`** - when no export name is given, output will be created without export

**`stability`** stable

#### Inherited from

RestApiProps.endpointExportName

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

RestApiProps.endpointTypes

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:183

___

### failOnWarnings

• `Optional` `Readonly` **failOnWarnings**: false \| true

Indicates whether to roll back the resource if a warning occurs while API Gateway is creating the RestApi resource.

**`default`** false

**`stability`** stable

#### Inherited from

RestApiProps.failOnWarnings

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:152

___

### gatewayResponses

• `Optional` **gatewayResponses**: `GatewayResponseOptions`[]

#### Defined in

[src/constructs/Api.ts:27](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/constructs/Api.ts#L27)

___

### logicalId

• `Optional` **logicalId**: `string`

#### Defined in

[src/constructs/Api.ts:28](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/constructs/Api.ts#L28)

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

RestApiProps.minimumCompressionSize

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:234

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

RestApiProps.parameters

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:136

___

### policy

• `Optional` `Readonly` **policy**: `PolicyDocument`

A policy document that contains the permissions for this RestApi.

**`default`** - No policy.

**`stability`** stable

#### Inherited from

RestApiProps.policy

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:145

___

### prefix

• **prefix**: `string`

#### Defined in

[src/constructs/Api.ts:25](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/constructs/Api.ts#L25)

___

### restApiName

• `Optional` `Readonly` **restApiName**: `string`

A name for the API Gateway RestApi resource.

**`default`** - ID of the RestApi construct.

**`stability`** stable

#### Inherited from

RestApiProps.restApiName

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

RestApiProps.retainDeployments

#### Defined in

node_modules/@aws-cdk/aws-apigateway/lib/restapi.d.ts:121

___

### stage

• **stage**: `string`

#### Defined in

[src/constructs/Api.ts:24](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/constructs/Api.ts#L24)

___

### userPool

• `Optional` **userPool**: `IUserPool`

#### Defined in

[src/constructs/Api.ts:26](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/constructs/Api.ts#L26)
