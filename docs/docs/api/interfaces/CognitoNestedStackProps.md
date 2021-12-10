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

PolicyStatements to attach when building an AuthenticatedRole. If an
authenticatedRole is not provided, one will be created.  If the
IdentityPool is not created, this will trigger the creation of one and
associate the authenticatedRole

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[authenticatedPolicyStatements](CognitoConstructProps#authenticatedpolicystatements)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:156](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cognito/CognitoConstruct.ts#L156)

___

### authenticatedRole

• `Optional` **authenticatedRole**: `string` \| `IRole`

Takes an IRole or an arn instead of building an AuthenticatedRole when
an IdentityPool is created.  If IdentityPool is not created, this will
trigger the creation of one and associate this role

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[authenticatedRole](CognitoConstructProps#authenticatedrole)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:148](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cognito/CognitoConstruct.ts#L148)

___

### css

• `Optional` **css**: `string`

CSS string to be used for the user pool UI customization.
For more info see [Cognito UI Customizations](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpooluicustomizationattachment.html#cfn-cognito-userpooluicustomizationattachment-css)

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[css](CognitoConstructProps#css)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:173](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cognito/CognitoConstruct.ts#L173)

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

Option to not use fixed logicalId's for the RestApi resource. For more
info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[dontOverrideLogicalId](CognitoConstructProps#dontoverridelogicalid)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:106](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cognito/CognitoConstruct.ts#L106)

___

### groups

• `Optional` **groups**: `GroupConfig`[]

Create groups for the user pool and, optionally, the identity pool

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[groups](CognitoConstructProps#groups)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:161](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cognito/CognitoConstruct.ts#L161)

___

### identityPool

• `Optional` **identityPool**: `CfnIdentityPoolProps` & { `removalPolicy?`: `DESTROY` \| `RETAIN` \| `SNAPSHOT`  } & `WithLogicalId`

Full configuration of the IdentityPool that will be created in addition
to having control over the logicalId

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[identityPool](CognitoConstructProps#identitypool)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:141](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cognito/CognitoConstruct.ts#L141)

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

• `Optional` **prefix**: `string`

The prefix to use with resource names. If `prefix` and `name` are
provided then the apiName will be `${prefix}-${name}`.  If no name
is provided then the apiName will be `prefix`. For more info, see
[Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[prefix](CognitoConstructProps#prefix)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:100](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cognito/CognitoConstruct.ts#L100)

___

### removalPolicy

• `Optional` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

RemovalPolicy to apply to all resources.  If a RemovalPolicy prop is provided
for a specific resource, ie the `props.userPool.removalPolicy`, it will
override this value

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[removalPolicy](CognitoConstructProps#removalpolicy)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:180](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cognito/CognitoConstruct.ts#L180)

___

### stackTimeout

• `Optional` **stackTimeout**: `Duration`

#### Defined in

[src/stacks/cognito/CognitoNestedStack.ts:14](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cognito/CognitoNestedStack.ts#L14)

___

### userPool

• `Optional` **userPool**: `UserPoolProps` & `WithLogicalId`

Full configuration of the UserPool that will be created in addition
to having control over the logicalId

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[userPool](CognitoConstructProps#userpool)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:118](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cognito/CognitoConstruct.ts#L118)

___

### userPoolClient

• `Optional` **userPoolClient**: `Pick`<`UserPoolClientProps`, ``"userPoolClientName"`` \| ``"generateSecret"`` \| ``"authFlows"`` \| ``"disableOAuth"`` \| ``"oAuth"`` \| ``"preventUserExistenceErrors"`` \| ``"supportedIdentityProviders"`` \| ``"idTokenValidity"`` \| ``"refreshTokenValidity"`` \| ``"accessTokenValidity"`` \| ``"readAttributes"`` \| ``"writeAttributes"`` \| ``"enableTokenRevocation"``\> & `WithLogicalId`

Full configuration of the UserPoolClient that will be created in addition
to having control over the logicalId

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[userPoolClient](CognitoConstructProps#userpoolclient)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:130](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cognito/CognitoConstruct.ts#L130)

___

### userPoolClientId

• `Optional` **userPoolClientId**: `string`

Will reuse an existing UserPoolClient by passing in the `userPoolClientId`
Will ignore the `userPoolClient` prop when using an existing UserPoolClient

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[userPoolClientId](CognitoConstructProps#userpoolclientid)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:124](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cognito/CognitoConstruct.ts#L124)

___

### userPoolDomain

• `Optional` **userPoolDomain**: `UserPoolDomainProps`

Full configuration of the UserPoolDomain that will be created

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[userPoolDomain](CognitoConstructProps#userpooldomain)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:135](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cognito/CognitoConstruct.ts#L135)

___

### userPoolId

• `Optional` **userPoolId**: `string`

Will reuse an existing UserPool by passing in the `userPoolId`.  Will
ignore the `userPool` prop when using an existing UserPool

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[userPoolId](CognitoConstructProps#userpoolid)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:112](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cognito/CognitoConstruct.ts#L112)

___

### users

• `Optional` **users**: { `groupNames`: `string`[] ; `userEmail`: `string`  }[]

Will provision the users in the UserPool.  Sets userEmail as the username
and optionally attaches the user to any number of groups

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[users](CognitoConstructProps#users)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:167](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/cognito/CognitoConstruct.ts#L167)
