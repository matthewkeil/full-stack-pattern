---
id: "FullStack"
title: "Class: FullStack"
sidebar_label: "FullStack"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`FullStackConstruct`](FullStackConstruct)

  ↳ **`FullStack`**

## Constructors

### constructor

• `Private` **new FullStack**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`FullStackProps`](../interfaces/FullStackProps) |

#### Overrides

[FullStackConstruct](FullStackConstruct).[constructor](FullStackConstruct#constructor)

#### Defined in

[src/patterns/FullStack.ts:5](https://github.com/matthewkeil/full-stack-pattern/blob/faec2ba/src/patterns/FullStack.ts#L5)

## Properties

### cdn

• `Optional` **cdn**: [`CDNStack`](CDNStack) \| [`CDNNestedStack`](CDNNestedStack)

#### Inherited from

[FullStackConstruct](FullStackConstruct).[cdn](FullStackConstruct#cdn)

#### Defined in

[src/patterns/FullStackConstruct.ts:237](https://github.com/matthewkeil/full-stack-pattern/blob/faec2ba/src/patterns/FullStackConstruct.ts#L237)

___

### cognito

• `Optional` **cognito**: [`CognitoStack`](CognitoStack) \| [`CognitoNestedStack`](CognitoNestedStack)

#### Inherited from

[FullStackConstruct](FullStackConstruct).[cognito](FullStackConstruct#cognito)

#### Defined in

[src/patterns/FullStackConstruct.ts:238](https://github.com/matthewkeil/full-stack-pattern/blob/faec2ba/src/patterns/FullStackConstruct.ts#L238)

___

### core

• `Optional` **core**: [`CoreStack`](CoreStack) \| [`CoreNestedStack`](CoreNestedStack)

#### Inherited from

[FullStackConstruct](FullStackConstruct).[core](FullStackConstruct#core)

#### Defined in

[src/patterns/FullStackConstruct.ts:236](https://github.com/matthewkeil/full-stack-pattern/blob/faec2ba/src/patterns/FullStackConstruct.ts#L236)

___

### domain

• `Optional` **domain**: `string`

#### Inherited from

[FullStackConstruct](FullStackConstruct).[domain](FullStackConstruct#domain)

#### Defined in

[src/patterns/FullStackConstruct.ts:240](https://github.com/matthewkeil/full-stack-pattern/blob/faec2ba/src/patterns/FullStackConstruct.ts#L240)

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

[FullStackConstruct](FullStackConstruct).[node](FullStackConstruct#node)

#### Defined in

node_modules/@aws-cdk/core/lib/construct-compat.d.ts:77

___

### serverless

• `Optional` **serverless**: [`ServerlessStack`](ServerlessStack) \| [`ServerlessNestedStack`](ServerlessNestedStack)

#### Inherited from

[FullStackConstruct](FullStackConstruct).[serverless](FullStackConstruct#serverless)

#### Defined in

[src/patterns/FullStackConstruct.ts:239](https://github.com/matthewkeil/full-stack-pattern/blob/faec2ba/src/patterns/FullStackConstruct.ts#L239)

## Methods

### addConfigFile

▸ **addConfigFile**(`__namedParameters`): `void`

Builds and uploads a configuration file to the ui bucket

See [ConfigFile](https://full-stack-pattern.matthewkeil.com/docs/constructs/configFile) for more information

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<`ConfigFileProps`<`Record`<`string`, `unknown`\>\>, ``"deploymentRole"`` \| ``"fileName"`` \| ``"mergeExisting"`` \| ``"config"``\> |

#### Returns

`void`

#### Inherited from

[FullStackConstruct](FullStackConstruct).[addConfigFile](FullStackConstruct#addconfigfile)

#### Defined in

[src/patterns/FullStackConstruct.ts:380](https://github.com/matthewkeil/full-stack-pattern/blob/faec2ba/src/patterns/FullStackConstruct.ts#L380)

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

[FullStackConstruct](FullStackConstruct).[onPrepare](FullStackConstruct#onprepare)

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

[FullStackConstruct](FullStackConstruct).[onSynthesize](FullStackConstruct#onsynthesize)

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

[FullStackConstruct](FullStackConstruct).[onValidate](FullStackConstruct#onvalidate)

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

[FullStackConstruct](FullStackConstruct).[prepare](FullStackConstruct#prepare)

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

[FullStackConstruct](FullStackConstruct).[synthesize](FullStackConstruct#synthesize)

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

[FullStackConstruct](FullStackConstruct).[toString](FullStackConstruct#tostring)

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

[FullStackConstruct](FullStackConstruct).[validate](FullStackConstruct#validate)

#### Defined in

node_modules/@aws-cdk/core/lib/construct-compat.d.ts:124

___

### create

▸ `Static` **create**(`scope`, `id`, `props`): `Promise`<[`FullStack`](FullStack)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`FullStackProps`](../interfaces/FullStackProps) & { `profile`: `string`  } |

#### Returns

`Promise`<[`FullStack`](FullStack)\>

#### Defined in

[src/patterns/FullStack.ts:12](https://github.com/matthewkeil/full-stack-pattern/blob/faec2ba/src/patterns/FullStack.ts#L12)

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

[FullStackConstruct](FullStackConstruct).[isConstruct](FullStackConstruct#isconstruct)

#### Defined in

node_modules/@aws-cdk/core/lib/construct-compat.d.ts:71

___

### lookupExistingResources

▸ `Static` **lookupExistingResources**(`props`): `Promise`<[`FullStackConstructProps`](../interfaces/FullStackConstructProps)\>

Is a helper function for the constructor.  You pass in the props you want
to use for the FullStackConstruct.  This function will fill some pieces
from the environment, for example the hostedZoneId.

Calls the underlying stacks to do their own lookups.  For more information
see the docs for each stack

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FullStackConstructProps`](../interfaces/FullStackConstructProps) & { `profile`: `string`  } |

#### Returns

`Promise`<[`FullStackConstructProps`](../interfaces/FullStackConstructProps)\>

#### Inherited from

[FullStackConstruct](FullStackConstruct).[lookupExistingResources](FullStackConstruct#lookupexistingresources)

#### Defined in

[src/patterns/FullStackConstruct.ts:179](https://github.com/matthewkeil/full-stack-pattern/blob/faec2ba/src/patterns/FullStackConstruct.ts#L179)
