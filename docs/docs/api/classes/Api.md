---
id: "Api"
title: "Class: Api"
sidebar_label: "Api"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Construct`

  ↳ **`Api`**

## Constructors

### constructor

• **new Api**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`ApiProps`](../interfaces/ApiProps) |

#### Overrides

Construct.constructor

#### Defined in

[src/constructs/Api.ts:40](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/constructs/Api.ts#L40)

## Properties

### allowedHeaders

• `Private` **allowedHeaders**: `string`

#### Defined in

[src/constructs/Api.ts:37](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/constructs/Api.ts#L37)

___

### allowedMethods

• `Private` **allowedMethods**: `string`

#### Defined in

[src/constructs/Api.ts:36](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/constructs/Api.ts#L36)

___

### allowedOrigins

• `Private` **allowedOrigins**: `string`

#### Defined in

[src/constructs/Api.ts:35](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/constructs/Api.ts#L35)

___

### api

• **api**: `IRestApi`

#### Defined in

[src/constructs/Api.ts:33](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/constructs/Api.ts#L33)

___

### authorizer

• `Private` `Optional` **authorizer**: `CognitoUserPoolsAuthorizer`

#### Defined in

[src/constructs/Api.ts:38](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/constructs/Api.ts#L38)

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

### addCorsMockIntegration

▸ `Private` **addCorsMockIntegration**(`apiResource`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiResource` | `IResource` |

#### Returns

`void`

#### Defined in

[src/constructs/Api.ts:143](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/constructs/Api.ts#L143)

___

### addGatewayResponses

▸ `Private` **addGatewayResponses**(): `void`

#### Returns

`void`

#### Defined in

[src/constructs/Api.ts:114](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/constructs/Api.ts#L114)

___

### addLambda

▸ **addLambda**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.lambda` | `Function` |
| `__namedParameters.method` | ``"GET"`` \| ``"PUT"`` \| ``"POST"`` \| ``"PATCH"`` \| ``"DELETE"`` \| ``"HEAD"`` \| ``"OPTIONS"`` |
| `__namedParameters.options?` | [`Mutable`](../modules#mutable)<`IntegrationOptions` & `MethodOptions`\> |
| `__namedParameters.path` | `string` |

#### Returns

`void`

#### Defined in

[src/constructs/Api.ts:81](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/constructs/Api.ts#L81)

___

### attachCognitoAuthorizer

▸ **attachCognitoAuthorizer**(`userPool`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userPool` | `IUserPool` |

#### Returns

`void`

#### Defined in

[src/constructs/Api.ts:73](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/constructs/Api.ts#L73)

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
