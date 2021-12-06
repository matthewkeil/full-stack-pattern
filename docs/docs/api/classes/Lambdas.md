---
id: "Lambdas"
title: "Class: Lambdas"
sidebar_label: "Lambdas"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Construct`

  ↳ **`Lambdas`**

## Constructors

### constructor

• **new Lambdas**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`LambdasProps`](../interfaces/LambdasProps) |

#### Overrides

Construct.constructor

#### Defined in

[src/constructs/Lambdas.ts:72](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambdas.ts#L72)

## Properties

### api

• `Optional` **api**: [`Api`](Api)

#### Defined in

[src/constructs/Lambdas.ts:68](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambdas.ts#L68)

___

### globalProps

• `Private` **globalProps**: `Pick`<[`LambdasProps`](../interfaces/LambdasProps), ``"prefix"`` \| ``"role"`` \| ``"events"`` \| ``"layers"`` \| ``"runtime"`` \| ``"timeout"`` \| ``"environment"`` \| ``"memorySize"`` \| ``"initialPolicy"`` \| ``"vpc"`` \| ``"vpcSubnets"`` \| ``"securityGroup"`` \| ``"securityGroups"`` \| ``"allowAllOutbound"`` \| ``"deadLetterQueueEnabled"`` \| ``"deadLetterQueue"`` \| ``"tracing"`` \| ``"profiling"`` \| ``"profilingGroup"`` \| ``"insightsVersion"`` \| ``"reservedConcurrentExecutions"`` \| ``"logRetention"`` \| ``"logRetentionRole"`` \| ``"logRetentionRetryOptions"`` \| ``"currentVersionOptions"`` \| ``"filesystem"`` \| ``"allowPublicSubnet"`` \| ``"environmentEncryption"`` \| ``"codeSigningConfig"`` \| ``"architectures"`` \| ``"architecture"`` \| ``"onFailure"`` \| ``"onSuccess"`` \| ``"maxEventAge"`` \| ``"retryAttempts"`` \| ``"externalId"`` \| ``"externalIds"`` \| ``"managedPolicies"`` \| ``"inlinePolicies"`` \| ``"path"`` \| ``"permissionsBoundary"`` \| ``"maxSessionDuration"`` \| ``"users"`` \| ``"groups"`` \| ``"statements"`` \| ``"force"`` \| ``"document"`` \| ``"encryptionKey"`` \| ``"retention"`` \| ``"removalPolicy"`` \| ``"table"`` \| ``"tables"`` \| ``"tableEnvKey"`` \| ``"dontOverrideLogicalId"`` \| ``"canInvoke"`` \| ``"warmingEvent"`` \| ``"loggingLevel"`` \| ``"api"`` \| ``"existingLogGroups"``\> & { `code?`: `Code`  }

#### Defined in

[src/constructs/Lambdas.ts:70](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambdas.ts#L70)

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

▪ [name: `string`]: [`Lambda`](Lambda)

#### Defined in

[src/constructs/Lambdas.ts:67](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambdas.ts#L67)

## Methods

### addLambda

▸ **addLambda**(`props`): [`Lambda`](Lambda)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `LambdasPropsOptionalRuntimeAndCode` |

#### Returns

[`Lambda`](Lambda)

#### Defined in

[src/constructs/Lambdas.ts:86](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/constructs/Lambdas.ts#L86)

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
