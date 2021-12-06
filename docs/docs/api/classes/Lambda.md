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

[src/constructs/Lambda.ts:201](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L201)

## Properties

### api

• `Optional` **api**: [`Api`](Api)

#### Defined in

[src/constructs/Lambda.ts:195](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L195)

___

### code

• **code**: `Code`

#### Defined in

[src/constructs/Lambda.ts:196](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L196)

___

### function

• **function**: `Function`

#### Defined in

[src/constructs/Lambda.ts:191](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L191)

___

### kebabName

• `Private` **kebabName**: `string`

#### Defined in

[src/constructs/Lambda.ts:199](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L199)

___

### logGroup

• **logGroup**: `ILogGroup`

#### Defined in

[src/constructs/Lambda.ts:192](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L192)

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

[src/constructs/Lambda.ts:198](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L198)

___

### policy

• `Optional` **policy**: `Policy`

#### Defined in

[src/constructs/Lambda.ts:194](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L194)

___

### props

• `Readonly` **props**: [`LambdaProps`](../interfaces/LambdaProps)

___

### role

• **role**: `IRole`

#### Defined in

[src/constructs/Lambda.ts:193](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L193)

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

[src/constructs/Lambda.ts:508](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L508)

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

[src/constructs/Lambda.ts:407](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L407)

___

### \_buildIam

▸ `Private` **_buildIam**(): `void`

#### Returns

`void`

#### Defined in

[src/constructs/Lambda.ts:424](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L424)

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

[src/constructs/Lambda.ts:479](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L479)

___

### \_getApi

▸ `Private` **_getApi**(): [`Api`](Api)

#### Returns

[`Api`](Api)

#### Defined in

[src/constructs/Lambda.ts:485](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L485)

___

### addApiEvent

▸ **addApiEvent**(`pathConfig`): [`Lambda`](Lambda)

- adds an api event to the lambda: hooks up apiGateway to trigger the lambda
and adds the necessary permissions.

- builds an express server to server the lambdas during development. devServer
supports hot reload and watch functionality. see [convert-lambda-to-express](https://www.npmjs.com/package/convert-lambda-to-express)
for more information

- can, optionally, pass in the RestApi that you want associated to the function
through the LambdaProps.api property when new'ing the Lambda.  If no api is
passed it looks at Stack.of(this).node.tryFindChild('Api') base stack and will
use the first RestApi it finds if one exists.  If no api is passed to the
constructor, nor is there a RestApi resource in the stack, one will be
created. It will be built so all subsequent Lambdas will be able to find
and use the same api.

If api is looked up then it can be anywhere in your code as long as its built
before trying to add an ApiEvent. Note that building the Lambda with an event in
the constructor props will call the .addApiEvent method under the hood. The
logicalId for the lookup method must be 'Api'.

If you want to use a different Api logicalId, you can pass in the Api object
directly to the constructor

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathConfig` | [`ApiEvent`](../interfaces/ApiEvent) |

#### Returns

[`Lambda`](Lambda)

#### Defined in

[src/constructs/Lambda.ts:364](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L364)

___

### addPermission

▸ **addPermission**(`principalOrArn`, `permission?`): [`Lambda`](Lambda)

simplifies the underlying `lambda.Function.prototype.addPermission`

- adds ability to just pass and arn as a string. automatically sets up
  the principal
- adds the invoke action

#### Parameters

| Name | Type |
| :------ | :------ |
| `principalOrArn` | `string` \| `PrincipalBase` |
| `permission` | `Partial`<`Permission`\> |

#### Returns

[`Lambda`](Lambda)

#### Defined in

[src/constructs/Lambda.ts:307](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L307)

___

### addWarmingEvent

▸ **addWarmingEvent**(`rule`): [`Lambda`](Lambda)

simplifies warming the function. Timing will be base by the Rule that gets
passed.  Event will emit the { warmer: true } object to the function

code can easily check for warming event and return early

#### Parameters

| Name | Type |
| :------ | :------ |
| `rule` | `Rule` |

#### Returns

[`Lambda`](Lambda)

#### Defined in

[src/constructs/Lambda.ts:328](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L328)

___

### associateTable

▸ **associateTable**(`__namedParameters`): [`Lambda`](Lambda)

Applies table.grantReadWriteData(role) for the function role if one was created.

Adds table name to environment variables. As an example when passing in
`table: "good-stuff-table"` will, by default, set actual tableName as:
  - `process.env.TABLE_NAME=client-project-env-good-stuff-table`
  - `process.env.GOOD_STUFF_TABLE=client-project-env-good-stuff-table`

You can override this with `tableEnvKey: TABLE_ENV_KEY` to create the
environment variables as:
`process.env.TABLE_NAME`
`process.env.TABLE_ENV_KEY`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`LambdaProps`](../interfaces/LambdaProps), ``"table"`` \| ``"tables"`` \| ``"tableEnvKey"``\> |

#### Returns

[`Lambda`](Lambda)

#### Defined in

[src/constructs/Lambda.ts:386](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambda.ts#L386)

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
