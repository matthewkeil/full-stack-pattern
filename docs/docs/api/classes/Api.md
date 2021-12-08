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

• **new Api**(`scope`, `id`, `props?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`ApiProps`](../interfaces/ApiProps) |

#### Overrides

Construct.constructor

#### Defined in

[src/constructs/Api.ts:97](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L97)

## Properties

### allowedHeaders

• `Private` **allowedHeaders**: `string`

#### Defined in

[src/constructs/Api.ts:91](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L91)

___

### allowedMethods

• `Private` **allowedMethods**: `string`

#### Defined in

[src/constructs/Api.ts:90](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L90)

___

### allowedOrigins

• `Private` **allowedOrigins**: `string`

#### Defined in

[src/constructs/Api.ts:89](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L89)

___

### api

• **api**: `RestApi`

#### Defined in

[src/constructs/Api.ts:87](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L87)

___

### authorizer

• `Private` `Optional` **authorizer**: `CognitoUserPoolsAuthorizer`

#### Defined in

[src/constructs/Api.ts:92](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L92)

___

### buildDevServer

• `Private` **buildDevServer**: `boolean`

#### Defined in

[src/constructs/Api.ts:95](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L95)

___

### kebabName

• `Private` **kebabName**: `string`

#### Defined in

[src/constructs/Api.ts:94](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L94)

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

[src/constructs/Api.ts:93](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L93)

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

[src/constructs/Api.ts:242](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L242)

___

### addGatewayResponses

▸ `Private` **addGatewayResponses**(): `void`

#### Returns

`void`

#### Defined in

[src/constructs/Api.ts:205](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L205)

___

### addLambda

▸ **addLambda**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.lambda` | [`Lambda`](Lambda) |
| `__namedParameters.method` | ``"GET"`` \| ``"PUT"`` \| ``"POST"`` \| ``"PATCH"`` \| ``"DELETE"`` \| ``"HEAD"`` \| ``"OPTIONS"`` |
| `__namedParameters.options?` | [`Mutable`](../modules#mutable)<`IntegrationOptions` & `MethodOptions`\> |
| `__namedParameters.path` | `string` |

#### Returns

`void`

#### Defined in

[src/constructs/Api.ts:157](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L157)

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

[src/constructs/Api.ts:149](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/constructs/Api.ts#L149)

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
