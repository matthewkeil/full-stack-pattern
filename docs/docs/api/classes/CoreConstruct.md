---
id: "CoreConstruct"
title: "Class: CoreConstruct"
sidebar_label: "CoreConstruct"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Construct`

  ↳ **`CoreConstruct`**

## Constructors

### constructor

• **new CoreConstruct**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`CoreConstructProps`](../interfaces/CoreConstructProps) |

#### Overrides

Construct.constructor

#### Defined in

[src/stacks/core/CoreConstruct.ts:102](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/core/CoreConstruct.ts#L102)

## Properties

### certificate

• **certificate**: `ICertificate`

#### Defined in

[src/stacks/core/CoreConstruct.ts:100](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/core/CoreConstruct.ts#L100)

___

### hostedZone

• **hostedZone**: `IHostedZone`

#### Defined in

[src/stacks/core/CoreConstruct.ts:99](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/core/CoreConstruct.ts#L99)

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

___

### lookupExistingResources

▸ `Static` **lookupExistingResources**(`props`): `Promise`<[`CoreConstructProps`](../interfaces/CoreConstructProps)\>

Will lookup the hostedZoneId and the certificateArn for the provided
rootDomain.  If a HostedZone is found for rootDomain the id is added
to props.hostedZoneId.  If a Certificate is found for the rootDomain
the certificateArn is added to props.certificateArn.  This makes it
easy to pass the returned props to the CoreConstruct constructor
function.

Must provide a region to search and optionally can provide
a profile to use (uses profile/credentials in ~/.aws/credentials) for
the lookup

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`CoreConstructProps`](../interfaces/CoreConstructProps) & { `profile?`: `string` ; `region`: `string`  } |

#### Returns

`Promise`<[`CoreConstructProps`](../interfaces/CoreConstructProps)\>

#### Defined in

[src/stacks/core/CoreConstruct.ts:75](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/core/CoreConstruct.ts#L75)
