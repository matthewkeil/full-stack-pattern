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

[src/stacks/cognito/CognitoConstruct.ts:68](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L68)

___

### authenticatedRole

• `Optional` **authenticatedRole**: `string` \| `IRole`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:67](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L67)

___

### css

• `Optional` **css**: `string`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:75](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L75)

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:53](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L53)

___

### groups

• `Optional` **groups**: `GroupConfig`[]

**`description`** Create groups for the user pool and, optionally, the identity pool

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:73](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L73)

___

### identityPool

• `Optional` **identityPool**: `CfnIdentityPoolProps` & { `removalPolicy?`: `DESTROY` \| `RETAIN` \| `SNAPSHOT`  } & `WithLogicalId`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:66](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L66)

___

### prefix

• `Optional` **prefix**: `string`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:52](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L52)

___

### removalPolicy

• `Optional` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:77](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L77)

___

### userPool

• `Optional` **userPool**: `UserPoolProps` & `WithLogicalId`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:58](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L58)

___

### userPoolClient

• `Optional` **userPoolClient**: `Pick`<`UserPoolClientProps`, ``"userPoolClientName"`` \| ``"generateSecret"`` \| ``"authFlows"`` \| ``"disableOAuth"`` \| ``"oAuth"`` \| ``"preventUserExistenceErrors"`` \| ``"supportedIdentityProviders"`` \| ``"idTokenValidity"`` \| ``"refreshTokenValidity"`` \| ``"accessTokenValidity"`` \| ``"readAttributes"`` \| ``"writeAttributes"`` \| ``"enableTokenRevocation"``\> & `WithLogicalId`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:60](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L60)

___

### userPoolClientId

• `Optional` **userPoolClientId**: `string`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:59](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L59)

___

### userPoolDomain

• `Optional` **userPoolDomain**: `UserPoolDomainProps`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:61](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L61)

___

### userPoolId

• `Optional` **userPoolId**: `string`

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:57](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cognito/CognitoConstruct.ts#L57)
