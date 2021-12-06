---
id: "CognitoNestedStackProps"
title: "Interface: CognitoNestedStackProps"
sidebar_label: "CognitoNestedStackProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Omit`<`NestedStackProps`, ``"removalPolicy"`` \| ``"timeout"``\>

- [`CognitoConstructProps`](CognitoConstructProps)

  ↳ **`CognitoNestedStackProps`**

## Properties

### authenticatedPolicyStatements

• `Optional` **authenticatedPolicyStatements**: `PolicyStatement`[]

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[authenticatedPolicyStatements](CognitoConstructProps#authenticatedpolicystatements)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:60](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L60)

___

### authenticatedRole

• `Optional` **authenticatedRole**: `string` \| `IRole`

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[authenticatedRole](CognitoConstructProps#authenticatedrole)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:59](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L59)

___

### certificateArn

• `Optional` **certificateArn**: `string`

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[certificateArn](CognitoConstructProps#certificatearn)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:54](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L54)

___

### css

• `Optional` **css**: `string`

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[css](CognitoConstructProps#css)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:66](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L66)

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[dontOverrideLogicalId](CognitoConstructProps#dontoverridelogicalid)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:44](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L44)

___

### groups

• `Optional` **groups**: `GroupConfig`[]

**`description`** Create groups for the user pool and, optionally, the identity pool

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[groups](CognitoConstructProps#groups)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:64](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L64)

___

### identityPool

• `Optional` **identityPool**: `IdentityPoolConfig`

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[identityPool](CognitoConstructProps#identitypool)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:58](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L58)

___

### notificationArns

• `Optional` `Readonly` **notificationArns**: `string`[]

The Simple Notification Service (SNS) topics to publish stack related events.

**`default`** - notifications are not sent for this stack.

**`stability`** stable

#### Inherited from

Omit.notificationArns

#### Defined in

node_modules/@aws-cdk/core/lib/nested-stack.d.ts:48

___

### parameters

• `Optional` `Readonly` **parameters**: `Object`

The set value pairs that represent the parameters passed to CloudFormation when this nested stack is created.

Each parameter has a name corresponding
to a parameter defined in the embedded template and a value representing
the value that you want to set for the parameter.

The nested stack construct will automatically synthesize parameters in order
to bind references from the parent stack(s) into the nested stack.

**`default`** - no user-defined parameters are passed to the nested stack

**`stability`** stable

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

Omit.parameters

#### Defined in

node_modules/@aws-cdk/core/lib/nested-stack.d.ts:25

___

### prefix

• **prefix**: `string`

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[prefix](CognitoConstructProps#prefix)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:43](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L43)

___

### removalPolicy

• `Optional` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[removalPolicy](CognitoConstructProps#removalpolicy)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:68](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L68)

___

### rootDomain

• `Optional` **rootDomain**: `string`

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[rootDomain](CognitoConstructProps#rootdomain)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:52](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L52)

___

### stackTimeout

• `Optional` **stackTimeout**: `Duration`

#### Defined in

[src/stacks/cognito/CognitoNestedStack.ts:14](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoNestedStack.ts#L14)

___

### subDomain

• `Optional` **subDomain**: `string`

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[subDomain](CognitoConstructProps#subdomain)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:53](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L53)

___

### userPool

• `Optional` **userPool**: `UserPoolProps`

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[userPool](CognitoConstructProps#userpool)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:49](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L49)

___

### userPoolClient

• `Optional` **userPoolClient**: `Pick`<`UserPoolClientProps`, ``"userPoolClientName"`` \| ``"generateSecret"`` \| ``"authFlows"`` \| ``"disableOAuth"`` \| ``"oAuth"`` \| ``"preventUserExistenceErrors"`` \| ``"supportedIdentityProviders"`` \| ``"idTokenValidity"`` \| ``"refreshTokenValidity"`` \| ``"accessTokenValidity"`` \| ``"readAttributes"`` \| ``"writeAttributes"`` \| ``"enableTokenRevocation"``\>

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[userPoolClient](CognitoConstructProps#userpoolclient)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:51](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L51)

___

### userPoolClientId

• `Optional` **userPoolClientId**: `string`

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[userPoolClientId](CognitoConstructProps#userpoolclientid)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:50](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L50)

___

### userPoolId

• `Optional` **userPoolId**: `string`

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[userPoolId](CognitoConstructProps#userpoolid)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:48](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L48)
