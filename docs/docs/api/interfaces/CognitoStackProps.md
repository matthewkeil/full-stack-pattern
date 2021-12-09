---
id: "CognitoStackProps"
title: "Interface: CognitoStackProps"
sidebar_label: "CognitoStackProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `StackProps`

- [`CognitoConstructProps`](CognitoConstructProps)

  ↳ **`CognitoStackProps`**

## Properties

### analyticsReporting

• `Optional` `Readonly` **analyticsReporting**: false \| true

Include runtime versioning information in this Stack.

**`default`** `analyticsReporting` setting of containing `App`, or value of
'aws:cdk:version-reporting' context key

**`stability`** stable

#### Inherited from

StackProps.analyticsReporting

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:126

___

### authenticatedPolicyStatements

• `Optional` **authenticatedPolicyStatements**: `PolicyStatement`[]

PolicyStatements to attach when building an AuthenticatedRole. If an
authenticatedRole is not provided, one will be created.  If the
IdentityPool is not created, this will trigger the creation of one and
associate the authenticatedRole

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[authenticatedPolicyStatements](CognitoConstructProps#authenticatedpolicystatements)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:156](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/cognito/CognitoConstruct.ts#L156)

___

### authenticatedRole

• `Optional` **authenticatedRole**: `string` \| `IRole`

Takes an IRole or an arn instead of building an AuthenticatedRole when
an IdentityPool is created.  If IdentityPool is not created, this will
trigger the creation of one and associate this role

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[authenticatedRole](CognitoConstructProps#authenticatedrole)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:148](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/cognito/CognitoConstruct.ts#L148)

___

### css

• `Optional` **css**: `string`

CSS string to be used for the user pool UI customization.
For more info see [Cognito UI Customizations](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpooluicustomizationattachment.html#cfn-cognito-userpooluicustomizationattachment-css)

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[css](CognitoConstructProps#css)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:173](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/cognito/CognitoConstruct.ts#L173)

___

### description

• `Optional` `Readonly` **description**: `string`

A description of the stack.

**`default`** - No description.

**`stability`** stable

#### Inherited from

StackProps.description

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:22

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

Option to not use fixed logicalId's for the RestApi resource. For more
info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[dontOverrideLogicalId](CognitoConstructProps#dontoverridelogicalid)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:106](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/cognito/CognitoConstruct.ts#L106)

___

### env

• `Optional` `Readonly` **env**: `Environment`

The AWS environment (account/region) where this stack will be deployed.

Set the `region`/`account` fields of `env` to either a concrete value to
select the indicated environment (recommended for production stacks), or to
the values of environment variables
`CDK_DEFAULT_REGION`/`CDK_DEFAULT_ACCOUNT` to let the target environment
depend on the AWS credentials/configuration that the CDK CLI is executed
under (recommended for development stacks).

If the `Stack` is instantiated inside a `Stage`, any undefined
`region`/`account` fields from `env` will default to the same field on the
encompassing `Stage`, if configured there.

If either `region` or `account` are not set nor inherited from `Stage`, the
Stack will be considered "*environment-agnostic*"". Environment-agnostic
stacks can be deployed to any environment but may not be able to take
advantage of all features of the CDK. For example, they will not be able to
use environmental context lookups such as `ec2.Vpc.fromLookup` and will not
automatically translate Service Principals to the right format based on the
environment's AWS partition, and other such enhancements.

**`default`** - The environment of the containing `Stage` if available,
otherwise create the stack will be environment-agnostic.

**`stability`** stable

**`example`**

// Use a concrete account and region to deploy this stack to:
// `.account` and `.region` will simply return these values.
new Stack(app, 'Stack1', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  },
});

// Use the CLI's current credentials to determine the target environment:
// `.account` and `.region` will reflect the account+region the CLI
// is configured to use (based on the user CLI credentials)
new Stack(app, 'Stack2', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
});

// Define multiple stacks stage associated with an environment
const myStage = new Stage(app, 'MyStage', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  }
});

// both of these stacks will use the stage's account/region:
// `.account` and `.region` will resolve to the concrete values as above
new MyStack(myStage, 'Stack1');
new YourStack(myStage, 'Stack2');

// Define an environment-agnostic stack:
// `.account` and `.region` will resolve to `{ "Ref": "AWS::AccountId" }` and `{ "Ref": "AWS::Region" }` respectively.
// which will only resolve to actual values by CloudFormation during deployment.
new MyStack(app, 'Stack1');

#### Inherited from

StackProps.env

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:87

___

### groups

• `Optional` **groups**: `GroupConfig`[]

Create groups for the user pool and, optionally, the identity pool

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[groups](CognitoConstructProps#groups)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:161](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/cognito/CognitoConstruct.ts#L161)

___

### identityPool

• `Optional` **identityPool**: `CfnIdentityPoolProps` & { `removalPolicy?`: `DESTROY` \| `RETAIN` \| `SNAPSHOT`  } & `WithLogicalId`

Full configuration of the IdentityPool that will be created in addition
to having control over the logicalId

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[identityPool](CognitoConstructProps#identitypool)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:141](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/cognito/CognitoConstruct.ts#L141)

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

[src/stacks/cognito/CognitoConstruct.ts:100](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/cognito/CognitoConstruct.ts#L100)

___

### removalPolicy

• `Optional` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

RemovalPolicy to apply to all resources.  If a RemovalPolicy prop is provided
for a specific resource, ie the `props.userPool.removalPolicy`, it will
override this value

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[removalPolicy](CognitoConstructProps#removalpolicy)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:180](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/cognito/CognitoConstruct.ts#L180)

___

### stackName

• `Optional` `Readonly` **stackName**: `string`

Name to deploy the stack with.

**`default`** - Derived from construct path.

**`stability`** stable

#### Inherited from

StackProps.stackName

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:94

___

### synthesizer

• `Optional` `Readonly` **synthesizer**: `IStackSynthesizer`

Synthesis method to use while deploying this stack.

**`default`** - `DefaultStackSynthesizer` if the `@aws-cdk/core:newStyleStackSynthesis` feature flag
is set, `LegacyStackSynthesizer` otherwise.

**`stability`** stable

#### Inherited from

StackProps.synthesizer

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:111

___

### tags

• `Optional` `Readonly` **tags**: `Object`

Stack tags that will be applied to all the taggable resources and the stack itself.

**`default`** {}

**`stability`** stable

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

StackProps.tags

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:101

___

### terminationProtection

• `Optional` `Readonly` **terminationProtection**: false \| true

Whether to enable termination protection for this stack.

**`default`** false

**`stability`** stable

#### Inherited from

StackProps.terminationProtection

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:118

___

### userPool

• `Optional` **userPool**: `UserPoolProps` & `WithLogicalId`

Full configuration of the UserPool that will be created in addition
to having control over the logicalId

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[userPool](CognitoConstructProps#userpool)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:118](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/cognito/CognitoConstruct.ts#L118)

___

### userPoolClient

• `Optional` **userPoolClient**: `Pick`<`UserPoolClientProps`, ``"userPoolClientName"`` \| ``"generateSecret"`` \| ``"authFlows"`` \| ``"disableOAuth"`` \| ``"oAuth"`` \| ``"preventUserExistenceErrors"`` \| ``"supportedIdentityProviders"`` \| ``"idTokenValidity"`` \| ``"refreshTokenValidity"`` \| ``"accessTokenValidity"`` \| ``"readAttributes"`` \| ``"writeAttributes"`` \| ``"enableTokenRevocation"``\> & `WithLogicalId`

Full configuration of the UserPoolClient that will be created in addition
to having control over the logicalId

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[userPoolClient](CognitoConstructProps#userpoolclient)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:130](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/cognito/CognitoConstruct.ts#L130)

___

### userPoolClientId

• `Optional` **userPoolClientId**: `string`

Will reuse an existing UserPoolClient by passing in the `userPoolClientId`
Will ignore the `userPoolClient` prop when using an existing UserPoolClient

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[userPoolClientId](CognitoConstructProps#userpoolclientid)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:124](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/cognito/CognitoConstruct.ts#L124)

___

### userPoolDomain

• `Optional` **userPoolDomain**: `UserPoolDomainProps`

Full configuration of the UserPoolDomain that will be created

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[userPoolDomain](CognitoConstructProps#userpooldomain)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:135](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/cognito/CognitoConstruct.ts#L135)

___

### userPoolId

• `Optional` **userPoolId**: `string`

Will reuse an existing UserPool by passing in the `userPoolId`.  Will
ignore the `userPool` prop when using an existing UserPool

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[userPoolId](CognitoConstructProps#userpoolid)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:112](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/cognito/CognitoConstruct.ts#L112)

___

### users

• `Optional` **users**: { `groupNames`: `string`[] ; `userEmail`: `string`  }[]

Will provision the users in the UserPool.  Sets userEmail as the username
and optionally attaches the user to any number of groups

#### Inherited from

[CognitoConstructProps](CognitoConstructProps).[users](CognitoConstructProps#users)

#### Defined in

[src/stacks/cognito/CognitoConstruct.ts:167](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/cognito/CognitoConstruct.ts#L167)
