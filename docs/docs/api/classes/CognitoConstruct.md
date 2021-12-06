---
id: "CognitoConstruct"
title: "Class: CognitoConstruct"
sidebar_label: "CognitoConstruct"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Construct`

  ↳ **`CognitoConstruct`**

## Constructors

### constructor

• **new CognitoConstruct**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`CognitoConstructProps`](../interfaces/CognitoConstructProps) |

#### Overrides

Construct.constructor

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:88](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L88)

## Properties

### authenticatedRole

• `Optional` **authenticatedRole**: `IRole`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:85](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L85)

___

### groups

• `Optional` **groups**: `Object`

#### Index signature

▪ [groupName: `string`]: { `group`: `CfnUserPoolGroup` ; `role?`: `IRole`  }

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:86](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L86)

___

### identityPool

• `Optional` **identityPool**: `CfnIdentityPool`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:84](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L84)

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

### userPool

• **userPool**: `IUserPool`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:81](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L81)

___

### userPoolClient

• **userPoolClient**: `IUserPoolClient`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:82](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L82)

___

### userPoolDomain

• `Optional` **userPoolDomain**: `CfnUserPoolDomain`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:83](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L83)

## Methods

### addGroup

▸ **addGroup**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `GroupConfig` |

#### Returns

`void`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:340](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L340)

___

### buildIdentityPool

▸ `Private` **buildIdentityPool**(): `void`

#### Returns

`void`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:272](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L272)

___

### buildRole

▸ `Private` **buildRole**(`__namedParameters`): `IRole`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.name?` | `string` |
| `__namedParameters.policyStatements?` | `PolicyStatement`[] |
| `__namedParameters.role?` | `string` \| `IRole` |

#### Returns

`IRole`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:217](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L217)

___

### buildUserPool

▸ `Private` **buildUserPool**(): `void`

#### Returns

`void`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:115](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L115)

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
