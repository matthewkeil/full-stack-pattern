---
id: "CognitoConstructProps"
title: "Interface: CognitoConstructProps"
sidebar_label: "CognitoConstructProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`CognitoConstructProps`**

  ↳ [`CognitoStackProps`](CognitoStackProps)

  ↳ [`CognitoNestedStackProps`](CognitoNestedStackProps)

## Properties

### authenticatedPolicyStatements

• `Optional` **authenticatedPolicyStatements**: `PolicyStatement`[]

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:60](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L60)

___

### authenticatedRole

• `Optional` **authenticatedRole**: `string` \| `IRole`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:59](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L59)

___

### certificateArn

• `Optional` **certificateArn**: `string`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:54](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L54)

___

### css

• `Optional` **css**: `string`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:66](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L66)

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:44](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L44)

___

### groups

• `Optional` **groups**: `GroupConfig`[]

**`description`** Create groups for the user pool and, optionally, the identity pool

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:64](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L64)

___

### identityPool

• `Optional` **identityPool**: `IdentityPoolConfig`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:58](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L58)

___

### prefix

• **prefix**: `string`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:43](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L43)

___

### removalPolicy

• `Optional` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:68](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L68)

___

### rootDomain

• `Optional` **rootDomain**: `string`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:52](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L52)

___

### subDomain

• `Optional` **subDomain**: `string`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:53](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L53)

___

### userPool

• `Optional` **userPool**: `UserPoolProps`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:49](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L49)

___

### userPoolClient

• `Optional` **userPoolClient**: `Pick`<`UserPoolClientProps`, ``"userPoolClientName"`` \| ``"generateSecret"`` \| ``"authFlows"`` \| ``"disableOAuth"`` \| ``"oAuth"`` \| ``"preventUserExistenceErrors"`` \| ``"supportedIdentityProviders"`` \| ``"idTokenValidity"`` \| ``"refreshTokenValidity"`` \| ``"accessTokenValidity"`` \| ``"readAttributes"`` \| ``"writeAttributes"`` \| ``"enableTokenRevocation"``\>

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:51](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L51)

___

### userPoolClientId

• `Optional` **userPoolClientId**: `string`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:50](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L50)

___

### userPoolId

• `Optional` **userPoolId**: `string`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:48](https://github.com/matthewkeil/full-stack-pattern/blob/c8ba585/src/stacks/cognito/CognitoConstruct.ts#L48)
