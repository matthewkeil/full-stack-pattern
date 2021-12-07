---
id: "modules"
title: "full-stack-pattern"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [Api](classes/Api)
- [CDNConstruct](classes/CDNConstruct)
- [CDNNestedStack](classes/CDNNestedStack)
- [CDNStack](classes/CDNStack)
- [CognitoConstruct](classes/CognitoConstruct)
- [CognitoNestedStack](classes/CognitoNestedStack)
- [CognitoStack](classes/CognitoStack)
- [CoreConstruct](classes/CoreConstruct)
- [CoreNestedStack](classes/CoreNestedStack)
- [CoreStack](classes/CoreStack)
- [FullStack](classes/FullStack)
- [FullStackConstruct](classes/FullStackConstruct)
- [FullStackNested](classes/FullStackNested)
- [Lambda](classes/Lambda)
- [Lambdas](classes/Lambdas)
- [ServerlessConstruct](classes/ServerlessConstruct)
- [ServerlessNestedStack](classes/ServerlessNestedStack)
- [ServerlessStack](classes/ServerlessStack)
- [Tables](classes/Tables)

## Interfaces

- [ApiEvent](interfaces/ApiEvent)
- [ApiProps](interfaces/ApiProps)
- [AsyncCoreNestedStackProps](interfaces/AsyncCoreNestedStackProps)
- [AsyncCoreStackProps](interfaces/AsyncCoreStackProps)
- [CDNConstructProps](interfaces/CDNConstructProps)
- [CDNNestedStackProps](interfaces/CDNNestedStackProps)
- [CDNStackProps](interfaces/CDNStackProps)
- [CognitoConstructProps](interfaces/CognitoConstructProps)
- [CognitoNestedStackProps](interfaces/CognitoNestedStackProps)
- [CognitoStackProps](interfaces/CognitoStackProps)
- [ConfigFileProps](interfaces/ConfigFileProps)
- [CoreConstructProps](interfaces/CoreConstructProps)
- [CoreNestedStackProps](interfaces/CoreNestedStackProps)
- [CoreStackProps](interfaces/CoreStackProps)
- [FullStackConstructProps](interfaces/FullStackConstructProps)
- [FullStackProps](interfaces/FullStackProps)
- [LambdaProps](interfaces/LambdaProps)
- [LambdasProps](interfaces/LambdasProps)
- [ServerlessConstructProps](interfaces/ServerlessConstructProps)
- [ServerlessNestedStackProps](interfaces/ServerlessNestedStackProps)
- [ServerlessStackProps](interfaces/ServerlessStackProps)
- [TablesProps](interfaces/TablesProps)

## Type aliases

### AddConfigFileProps

Ƭ **AddConfigFileProps**: [`ConfigFileProps`](interfaces/ConfigFileProps) & { `serviceToken`: `string`  }

#### Defined in

[src/stacks/serverless/ServerlessConstruct.ts:9](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/serverless/ServerlessConstruct.ts#L9)

___

### HttpMethod

Ƭ **HttpMethod**: typeof [`httpMethods`](modules#httpmethods)[`number`]

#### Defined in

[lib/HttpMethod.ts:2](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/HttpMethod.ts#L2)

___

### LogLevel

Ƭ **LogLevel**: ``"DEBUG"`` \| ``"INFO"`` \| ``"WARNING"`` \| ``"ERROR"`` \| ``"CRITICAL"``

#### Defined in

[lib/Logger.ts:1](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/Logger.ts#L1)

___

### Mutable

Ƭ **Mutable**<`T`\>: { -readonly [K in keyof T]: T[K] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Defined in

[lib/Mutable.ts:3](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/Mutable.ts#L3)

## Variables

### httpMethods

• **httpMethods**: readonly [``"GET"``, ``"PUT"``, ``"POST"``, ``"PATCH"``, ``"DELETE"``, ``"HEAD"``, ``"OPTIONS"``]

#### Defined in

[lib/HttpMethod.ts:1](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/HttpMethod.ts#L1)

## Functions

### bucketExists

▸ `Const` **bucketExists**(`__namedParameters`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.bucketName` | `string` |
| `__namedParameters.profile?` | `string` |
| `__namedParameters.region?` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[lib/aws/s3.ts:2](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/aws/s3.ts#L2)

___

### buildLayer

▸ **buildLayer**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.pathToDist?` | `string` |
| `__namedParameters.pkgJsonPath` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/buildLayer.ts:30](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/buildLayer.ts#L30)

___

### capitalizeFirstLetter

▸ **capitalizeFirstLetter**(`segment`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `segment` | `string` |

#### Returns

`string`

#### Defined in

[lib/changeCase.ts:11](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/changeCase.ts#L11)

___

### exec

▸ **exec**(`command`, `logToConsole?`): `Promise`<`string`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `command` | `string` | `undefined` |
| `logToConsole` | `boolean` | `true` |

#### Returns

`Promise`<`string`\>

#### Defined in

[lib/exec.ts:3](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/exec.ts#L3)

___

### existingLogGroups

▸ `Const` **existingLogGroups**(`__namedParameters`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.prefix?` | `string` |
| `__namedParameters.profile?` | `string` |
| `__namedParameters.region?` | `string` |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[lib/aws/cwLogs.ts:2](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/aws/cwLogs.ts#L2)

___

### getApiGatewayAccountRole

▸ `Const` **getApiGatewayAccountRole**(): `Promise`<`undefined` \| `string`\>

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[lib/aws/apiGateway.ts:5](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/aws/apiGateway.ts#L5)

___

### getCertArnForDomain

▸ **getCertArnForDomain**(`__namedParameters`): `Promise`<`undefined` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.domain` | `string` |
| `__namedParameters.profile?` | `string` |
| `__namedParameters.region` | `string` |

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[lib/aws/certificateManager.ts:4](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/aws/certificateManager.ts#L4)

___

### getConfig

▸ **getConfig**<`S`, `T`\>(`stages`, `statics?`): () => `Promise`<`S` & `T` & { `stage`: `string`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `Object` |
| `T` | `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `stages` | `S`[] |
| `statics?` | `T` |

#### Returns

`fn`

▸ (): `Promise`<`S` & `T` & { `stage`: `string`  }\>

##### Returns

`Promise`<`S` & `T` & { `stage`: `string`  }\>

#### Defined in

[lib/getConfig.ts:4](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/getConfig.ts#L4)

___

### getHostedZoneIdForDomain

▸ `Const` **getHostedZoneIdForDomain**(`__namedParameters`): `Promise`<`undefined` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.profile?` | `string` |
| `__namedParameters.region?` | `string` |
| `__namedParameters.rootDomain` | `string` |

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[lib/aws/route53.ts:4](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/aws/route53.ts#L4)

___

### getLocalGitBranch

▸ **getLocalGitBranch**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[lib/getLocalGitBranch.ts:3](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/getLocalGitBranch.ts#L3)

___

### handler

▸ `Const` **handler**(`event`, `context`, `callback`): `void` \| `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `CloudFormationCustomResourceEvent` |
| `context` | `Context` |
| `callback` | `Callback`<`void`\> |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[providers/configFileProvider/index.ts:124](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/providers/configFileProvider/index.ts#L124)

___

### isHttpMethod

▸ **isHttpMethod**(`value`): value is "GET" \| "PUT" \| "POST" \| "PATCH" \| "DELETE" \| "HEAD" \| "OPTIONS"

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is "GET" \| "PUT" \| "POST" \| "PATCH" \| "DELETE" \| "HEAD" \| "OPTIONS"

#### Defined in

[lib/HttpMethod.ts:3](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/HttpMethod.ts#L3)

___

### listTableNames

▸ `Const` **listTableNames**(`__namedParameters`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.prefix?` | `string` |
| `__namedParameters.profile?` | `string` |
| `__namedParameters.region?` | `string` |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[lib/aws/dynamodb.ts:2](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/aws/dynamodb.ts#L2)

___

### mergeProps

▸ `Const` **mergeProps**<`T`\>(...`objects`): `Intersection`<`T`[`number`]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `IObject`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...objects` | `T` |

#### Returns

`Intersection`<`T`[`number`]\>

#### Defined in

[lib/mergeProps.ts:28](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/mergeProps.ts#L28)

___

### normalizeDomain

▸ `Const` **normalizeDomain**(`domain?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `domain` | `string` | `''` |

#### Returns

`string`

#### Defined in

[lib/normalizeDomain.ts:1](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/normalizeDomain.ts#L1)

___

### toCamel

▸ **toCamel**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[lib/changeCase.ts:23](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/changeCase.ts#L23)

___

### toEnv

▸ **toEnv**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[lib/changeCase.ts:26](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/changeCase.ts#L26)

___

### toKebab

▸ **toKebab**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[lib/changeCase.ts:17](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/changeCase.ts#L17)

___

### toPascal

▸ **toPascal**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[lib/changeCase.ts:20](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/lib/changeCase.ts#L20)
