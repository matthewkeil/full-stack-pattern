---
id: "Tables"
title: "Class: Tables"
sidebar_label: "Tables"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Construct`

  ↳ **`Tables`**

## Constructors

### constructor

• **new Tables**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`TablesProps`](../interfaces/TablesProps) |

#### Overrides

Construct.constructor

#### Defined in

[src/constructs/Tables.ts:31](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/constructs/Tables.ts#L31)

## Properties

### globalProps

• `Private` **globalProps**: `Pick`<[`TablesProps`](../interfaces/TablesProps), ``"prefix"`` \| ``"encryptionKey"`` \| ``"removalPolicy"`` \| ``"dontOverrideLogicalId"`` \| ``"kinesisStream"`` \| ``"readCapacity"`` \| ``"writeCapacity"`` \| ``"billingMode"`` \| ``"pointInTimeRecovery"`` \| ``"serverSideEncryption"`` \| ``"encryption"`` \| ``"timeToLiveAttribute"`` \| ``"stream"`` \| ``"replicationRegions"`` \| ``"replicationTimeout"`` \| ``"waitForReplicationToFinish"`` \| ``"contributorInsightsEnabled"``\>

#### Defined in

[src/constructs/Tables.ts:29](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/constructs/Tables.ts#L29)

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

### resources

• **resources**: `Object` = `{}`

#### Index signature

▪ [tableName: `string`]: `Table`

#### Defined in

[src/constructs/Tables.ts:28](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/constructs/Tables.ts#L28)

## Methods

### addTable

▸ **addTable**(`tableProps`): `Table`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableProps` | `TableProps` |

#### Returns

`Table`

#### Defined in

[src/constructs/Tables.ts:40](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/constructs/Tables.ts#L40)

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
