---
id: "CDNConstruct"
title: "Class: CDNConstruct"
sidebar_label: "CDNConstruct"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Construct`

  ↳ **`CDNConstruct`**

## Constructors

### constructor

• **new CDNConstruct**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`CDNConstructProps`](../interfaces/CDNConstructProps) |

#### Overrides

Construct.constructor

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:194](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L194)

## Properties

### bucket

• **bucket**: `IBucket`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:187](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L187)

___

### configFileProvider

• **configFileProvider**: [`Lambda`](Lambda)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:189](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L189)

___

### distribution

• **distribution**: `CloudFrontWebDistribution`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:188](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L188)

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

### originAccessIdentity

• `Private` **originAccessIdentity**: `OriginAccessIdentity`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:192](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L192)

___

### urls

• `Optional` **urls**: `string`[]

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:190](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L190)

## Methods

### buildBucket

▸ `Private` **buildBucket**(): `IBucket`

#### Returns

`IBucket`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:226](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L226)

___

### buildCodeDeployment

▸ `Private` **buildCodeDeployment**(): [`Lambda`](Lambda)

#### Returns

[`Lambda`](Lambda)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:455](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L455)

___

### buildDistribution

▸ `Private` **buildDistribution**(): `CloudFrontWebDistribution`

#### Returns

`CloudFrontWebDistribution`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:265](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L265)

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

### buildUrls

▸ `Static` **buildUrls**(`__namedParameters`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.buildWwwSubdomain?` | false \| true |
| `__namedParameters.rootDomain` | `string` |
| `__namedParameters.stage` | `string` |

#### Returns

`string`[]

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:153](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L153)

___

### getBucketName

▸ `Static` **getBucketName**(`__namedParameters`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`CDNConstructProps`](../interfaces/CDNConstructProps), ``"prefix"`` \| ``"bucketName"``\> & { `urls?`: `string`[]  } |

#### Returns

`string`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:171](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L171)

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

### urlSafe

▸ `Static` `Private` **urlSafe**(`stage`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stage` | `string` |

#### Returns

`string`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:149](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L149)
