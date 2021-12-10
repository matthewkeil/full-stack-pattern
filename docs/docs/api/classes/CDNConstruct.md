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

[src/stacks/cdn/CDNConstruct.ts:278](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cdn/CDNConstruct.ts#L278)

## Properties

### bucket

• **bucket**: `IBucket`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:272](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cdn/CDNConstruct.ts#L272)

___

### distribution

• **distribution**: `CloudFrontWebDistribution`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:273](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cdn/CDNConstruct.ts#L273)

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

[src/stacks/cdn/CDNConstruct.ts:276](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cdn/CDNConstruct.ts#L276)

___

### urls

• `Optional` **urls**: `string`[]

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:274](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cdn/CDNConstruct.ts#L274)

## Methods

### buildBucket

▸ `Private` **buildBucket**(): `IBucket`

#### Returns

`IBucket`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:310](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cdn/CDNConstruct.ts#L310)

___

### buildCodeDeployment

▸ `Private` **buildCodeDeployment**(): `void`

#### Returns

`void`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:544](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cdn/CDNConstruct.ts#L544)

___

### buildDistribution

▸ `Private` **buildDistribution**(): `CloudFrontWebDistribution`

#### Returns

`CloudFrontWebDistribution`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:354](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cdn/CDNConstruct.ts#L354)

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
| `__namedParameters` | `BuildUrlsProps` |

#### Returns

`string`[]

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:188](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cdn/CDNConstruct.ts#L188)

___

### getBucketName

▸ `Static` **getBucketName**(`props`): `string`

Exposes the algorithm that is used to generate the bucket name from the
construct `props`.  Useful if you need to know the bucket name for other
constructs and are getting a circular dependency error when importing the
IBucket.  Gotta love chicken and the egg ala cdk.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `GetBucketNameProps` |

#### Returns

`string`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:210](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cdn/CDNConstruct.ts#L210)

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

▸ `Static` **lookupExistingResources**(`props`): `Promise`<[`CDNConstructProps`](../interfaces/CDNConstructProps)\>

This is a helper function to avoid resource collisions during development.
When buckets get left behind, rebuilding the stack throws an error. Does a
lookup for the bucket that is going to get built and adds
`props.bucketName` and `props.useExistingBucket = true` to the props and
returns the full props object to be used with `new CDNConstruct()`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`CDNConstructProps`](../interfaces/CDNConstructProps) & { `profile?`: `string` ; `region`: `string`  } |

#### Returns

`Promise`<[`CDNConstructProps`](../interfaces/CDNConstructProps)\>

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:243](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cdn/CDNConstruct.ts#L243)

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

[src/stacks/cdn/CDNConstruct.ts:184](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cdn/CDNConstruct.ts#L184)
