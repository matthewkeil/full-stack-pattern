---
id: "FullStackConstruct"
title: "Class: FullStackConstruct"
sidebar_label: "FullStackConstruct"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Construct`

  ↳ **`FullStackConstruct`**

  ↳↳ [`FullStack`](FullStack)

## Constructors

### constructor

• **new FullStackConstruct**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`FullStackConstructProps`](../interfaces/FullStackConstructProps) |

#### Overrides

Construct.constructor

#### Defined in

[src/patterns/FullStackConstruct.ts:73](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L73)

## Properties

### auth

• **auth**: [`CognitoStack`](CognitoStack) \| [`CognitoNestedStack`](CognitoNestedStack)

#### Defined in

[src/patterns/FullStackConstruct.ts:70](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L70)

___

### backend

• **backend**: [`ServerlessStack`](ServerlessStack) \| [`ServerlessNestedStack`](ServerlessNestedStack)

#### Defined in

[src/patterns/FullStackConstruct.ts:71](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L71)

___

### core

• **core**: [`CoreStack`](CoreStack) \| [`CoreNestedStack`](CoreNestedStack)

#### Defined in

[src/patterns/FullStackConstruct.ts:68](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L68)

___

### frontend

• **frontend**: [`CDNStack`](CDNStack) \| [`CDNNestedStack`](CDNNestedStack)

#### Defined in

[src/patterns/FullStackConstruct.ts:69](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L69)

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Construct.node

#### Defined in

node_modules/@aws-cdk/core/lib/construct-compat.d.ts:77

## Methods

### addConfigFile

▸ **addConfigFile**(`configProps`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `configProps` | [`ConfigFileProps`](../interfaces/ConfigFileProps) |

#### Returns

`void`

#### Defined in

[src/patterns/FullStackConstruct.ts:178](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L178)

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

### addAccountProps

▸ `Static` **addAccountProps**(`props`): `Promise`<[`FullStackConstructProps`](../interfaces/FullStackConstructProps)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FullStackConstructProps`](../interfaces/FullStackConstructProps) & { `profile`: `string`  } |

#### Returns

`Promise`<[`FullStackConstructProps`](../interfaces/FullStackConstructProps)\>

#### Defined in

[src/patterns/FullStackConstruct.ts:185](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L185)

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
