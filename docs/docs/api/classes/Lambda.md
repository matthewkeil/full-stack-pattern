---
id: "Lambda"
title: "Class: Lambda"
sidebar_label: "Lambda"
sidebar_position: 0
custom_edit_url: null
---

Creates and configures

## Hierarchy

- `Construct`

  ↳ **`Lambda`**

## Constructors

### constructor

• **new Lambda**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`LambdaProps`](../interfaces/LambdaProps) |

#### Overrides

Construct.constructor

#### Defined in

[src/constructs/Lambda.ts:116](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L116)

## Properties

### api

• `Optional` **api**: [`Api`](Api)

#### Defined in

[src/constructs/Lambda.ts:109](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L109)

___

### buildDevServer

• `Private` **buildDevServer**: `boolean`

#### Defined in

[src/constructs/Lambda.ts:114](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L114)

___

### code

• `Private` **code**: `Code`

#### Defined in

[src/constructs/Lambda.ts:113](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L113)

___

### function

• **function**: `Function`

#### Defined in

[src/constructs/Lambda.ts:105](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L105)

___

### kebabName

• `Private` **kebabName**: `string`

#### Defined in

[src/constructs/Lambda.ts:112](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L112)

___

### logGroup

• **logGroup**: `ILogGroup`

#### Defined in

[src/constructs/Lambda.ts:106](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L106)

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Construct.node

#### Defined in

node_modules/@aws-cdk/core/lib/construct-compat.d.ts:77

___

### pascalName

• `Private` **pascalName**: `string`

#### Defined in

[src/constructs/Lambda.ts:111](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L111)

___

### policy

• `Optional` **policy**: `Policy`

#### Defined in

[src/constructs/Lambda.ts:108](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L108)

___

### props

• `Protected` **props**: [`LambdaProps`](../interfaces/LambdaProps)

___

### role

• **role**: `IRole`

#### Defined in

[src/constructs/Lambda.ts:107](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L107)

## Methods

### \_addApiEvent

▸ `Private` **_addApiEvent**(`apiEvent`): [`Lambda`](Lambda)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiEvent` | [`ApiEvent`](../interfaces/ApiEvent) |

#### Returns

[`Lambda`](Lambda)

#### Defined in

[src/constructs/Lambda.ts:397](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L397)

___

### \_associateTable

▸ `Private` **_associateTable**(`__namedParameters`): [`Lambda`](Lambda)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.table` | `ITable` |
| `__namedParameters.tableEnvKey?` | `string` |

#### Returns

[`Lambda`](Lambda)

#### Defined in

[src/constructs/Lambda.ts:296](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L296)

___

### \_buildIam

▸ `Private` **_buildIam**(): `void`

#### Returns

`void`

#### Defined in

[src/constructs/Lambda.ts:313](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L313)

___

### \_filterApiEvents

▸ `Private` **_filterApiEvents**(`_events`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_events` | ([`ApiEvent`](../interfaces/ApiEvent) \| `IEventSource`)[] |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `apiEvents` | [`ApiEvent`](../interfaces/ApiEvent)[] |
| `events` | `IEventSource`[] |

#### Defined in

[src/constructs/Lambda.ts:368](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L368)

___

### \_getApi

▸ `Private` **_getApi**(): [`Api`](Api)

#### Returns

[`Api`](Api)

#### Defined in

[src/constructs/Lambda.ts:374](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L374)

___

### addApiEvent

▸ **addApiEvent**(`pathConfig`): [`Lambda`](Lambda)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathConfig` | [`ApiEvent`](../interfaces/ApiEvent) |

#### Returns

[`Lambda`](Lambda)

#### Defined in

[src/constructs/Lambda.ts:252](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L252)

___

### addPermission

▸ **addPermission**(`principalOrArn`, `permission?`): [`Lambda`](Lambda)

#### Parameters

| Name | Type |
| :------ | :------ |
| `principalOrArn` | `string` \| `PrincipalBase` |
| `permission` | `Partial`<`Permission`\> |

#### Returns

[`Lambda`](Lambda)

#### Defined in

[src/constructs/Lambda.ts:225](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L225)

___

### addWarmingEvent

▸ **addWarmingEvent**(`rule`): [`Lambda`](Lambda)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rule` | `Rule` |

#### Returns

[`Lambda`](Lambda)

#### Defined in

[src/constructs/Lambda.ts:240](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L240)

___

### associateTable

▸ **associateTable**(`__namedParameters`): [`Lambda`](Lambda)

**`description`** Associates a table with the function.

Applies grantReadWriteData for the function role if one was created.

Adds table name to environment variables. As an example when passing in `table: "admin-table"` will set actual
prefixed tableName as `process.env.TABLE_NAME=client-project-env-admin-table` and
`process.env.ADMIN_TABLE=client-project-env-admin-table` by default.  You can override this with `tableEnvKey`
to create the environment variables as `TABLE_NAME` and the `TABLE_ENV_KEY` that was passed in.

Is backwards compatible with passing `table: string` like LambdasAndLogGroups.  Need to pass in DynamoTables
construct for this functionality.  Can also be used with `table: string` when using Lambdas construct as
it will pass in the DynamoTables object for you.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`LambdaProps`](../interfaces/LambdaProps), ``"table"`` \| ``"tables"`` \| ``"tableEnvKey"``\> |

#### Returns

[`Lambda`](Lambda)

#### Defined in

[src/constructs/Lambda.ts:275](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/constructs/Lambda.ts#L275)

___

### onPrepare

▸ `Protected` **onPrepare**(): `void`

Perform final modifications before synthesis.

This method can be implemented by derived constructs in order to perform
final changes before synthesis. prepare() will be called after child
constructs have been prepared.

This is an advanced framework feature. Only use this if you
understand the implications.

**`stability`** stable

#### Returns

`void`

#### Inherited from

Construct.onPrepare

#### Defined in

node_modules/@aws-cdk/core/lib/construct-compat.d.ts:104

___

### onSynthesize

▸ `Protected` **onSynthesize**(`session`): `void`

Allows this construct to emit artifacts into the cloud assembly during synthesis.

This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
as they participate in synthesizing the cloud assembly.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `session` | `ISynthesisSession` | The synthesis session. |

#### Returns

`void`

#### Inherited from

Construct.onSynthesize

#### Defined in

node_modules/@aws-cdk/core/lib/construct-compat.d.ts:114

___

### onValidate

▸ `Protected` **onValidate**(): `string`[]

Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.

**`stability`** stable

#### Returns

`string`[]

An array of validation error messages, or an empty array if the construct is valid.

#### Inherited from

Construct.onValidate

#### Defined in

node_modules/@aws-cdk/core/lib/construct-compat.d.ts:91

___

### prepare

▸ `Protected` **prepare**(): `void`

Perform final modifications before synthesis.

This method can be implemented by derived constructs in order to perform
final changes before synthesis. prepare() will be called after child
constructs have been prepared.

This is an advanced framework feature. Only use this if you
understand the implications.

**`stability`** stable

#### Returns

`void`

#### Inherited from

Construct.prepare

#### Defined in

node_modules/@aws-cdk/core/lib/construct-compat.d.ts:137

___

### synthesize

▸ `Protected` **synthesize**(`session`): `void`

Allows this construct to emit artifacts into the cloud assembly during synthesis.

This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
as they participate in synthesizing the cloud assembly.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `session` | `ISynthesisSession` | The synthesis session. |

#### Returns

`void`

#### Inherited from

Construct.synthesize

#### Defined in

node_modules/@aws-cdk/core/lib/construct-compat.d.ts:147

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

Construct.toString

#### Defined in

node_modules/constructs/lib/construct.d.ts:363

___

### validate

▸ `Protected` **validate**(): `string`[]

Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.

**`stability`** stable

#### Returns

`string`[]

An array of validation error messages, or an empty array if the construct is valid.

#### Inherited from

Construct.validate

#### Defined in

node_modules/@aws-cdk/core/lib/construct-compat.d.ts:124

___

### isConstruct

▸ `Static` **isConstruct**(`x`): x is Construct

Return whether the given object is a Construct.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `any` |

#### Returns

x is Construct

#### Inherited from

Construct.isConstruct

#### Defined in

node_modules/@aws-cdk/core/lib/construct-compat.d.ts:71
