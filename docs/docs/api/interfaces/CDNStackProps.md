---
id: "CDNStackProps"
title: "Interface: CDNStackProps"
sidebar_label: "CDNStackProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `StackProps`

- [`CDNConstructProps`](CDNConstructProps)

  ↳ **`CDNStackProps`**

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

### api

• `Optional` **api**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiPathPattern?` | `string` | The url paths that will be forwarded to the api.  **`default`** "/api/*" |
| `apiStage?` | `string` | The api stage (path suffix) at the end of the execute domain.  **`default`** "/prod" |
| `restApi` | `IRestApi` | The RestApi that is being hit via CloudFront. |

#### Inherited from

[CDNConstructProps](CDNConstructProps).[api](CDNConstructProps#api)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:113](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/stacks/cdn/CDNConstruct.ts#L113)

___

### bucketName

• `Optional` **bucketName**: `string`

Set the bucketName

#### Inherited from

[CDNConstructProps](CDNConstructProps).[bucketName](CDNConstructProps#bucketname)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:69](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/stacks/cdn/CDNConstruct.ts#L69)

___

### bucketProps

• `Optional` **bucketProps**: `Pick`<`BucketProps`, ``"bucketName"`` \| ``"encryptionKey"`` \| ``"encryption"`` \| ``"enforceSSL"`` \| ``"bucketKeyEnabled"`` \| ``"versioned"`` \| ``"lifecycleRules"`` \| ``"websiteIndexDocument"`` \| ``"websiteErrorDocument"`` \| ``"websiteRedirect"`` \| ``"websiteRoutingRules"`` \| ``"accessControl"`` \| ``"publicReadAccess"`` \| ``"blockPublicAccess"`` \| ``"metrics"`` \| ``"cors"`` \| ``"serverAccessLogsBucket"`` \| ``"serverAccessLogsPrefix"`` \| ``"inventories"`` \| ``"objectOwnership"``\>

Optional. If creating the hosting bucket, these props will be
passed to the Bucket construct. To set removal policy use
`CDNConstructProps.removalPolicy`.  When removalPolicy is set to DESTROY,
which is the default behavior, autoDeleteObjects will be enabled.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[bucketProps](CDNConstructProps#bucketprops)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:111](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/stacks/cdn/CDNConstruct.ts#L111)

___

### buildWwwSubdomain

• `Optional` **buildWwwSubdomain**: false \| true

will build www.{rootDomain} alias on `prod` stage in addition
to the naked rootDomain. For non-production stages, this is a no-op.

**`default`** true

#### Inherited from

[CDNConstructProps](CDNConstructProps).[buildWwwSubdomain](CDNConstructProps#buildwwwsubdomain)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:93](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/stacks/cdn/CDNConstruct.ts#L93)

___

### certificate

• `Optional` **certificate**: `ICertificate`

The TLS/SSL certificate to use for the distribution.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[certificate](CDNConstructProps#certificate)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:103](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/stacks/cdn/CDNConstruct.ts#L103)

___

### codePaths

• **codePaths**: `string`[]

The absolute paths for the code that will be uploaded and
hosted via S3/CloudFront.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[codePaths](CDNConstructProps#codepaths)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:49](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/stacks/cdn/CDNConstruct.ts#L49)

___

### deploymentRole

• `Optional` **deploymentRole**: `IRole`

Deployment role to use when publishing files to S3.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[deploymentRole](CDNConstructProps#deploymentrole)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:135](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/stacks/cdn/CDNConstruct.ts#L135)

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

[CDNConstructProps](CDNConstructProps).[dontOverrideLogicalId](CDNConstructProps#dontoverridelogicalid)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:43](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/stacks/cdn/CDNConstruct.ts#L43)

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

### hostedZone

• `Optional` **hostedZone**: `IHostedZone`

HostedZone to add Distribution AliasRecords to.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[hostedZone](CDNConstructProps#hostedzone)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:98](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/stacks/cdn/CDNConstruct.ts#L98)

___

### noBucketPolicy

• `Optional` **noBucketPolicy**: false \| true

This is for accounts/clients that have high security and restrict making
bucket policies. Has no effect unless `props.useExistingBucket = true`

#### Inherited from

[CDNConstructProps](CDNConstructProps).[noBucketPolicy](CDNConstructProps#nobucketpolicy)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:64](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/stacks/cdn/CDNConstruct.ts#L64)

___

### prefix

• `Optional` **prefix**: `string`

The prefix to use for the resources.  Will prefix all resource names with this value. For more info, see
[Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Inherited from

[CDNConstructProps](CDNConstructProps).[prefix](CDNConstructProps#prefix)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:37](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/stacks/cdn/CDNConstruct.ts#L37)

___

### removalPolicy

• `Optional` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

#### Inherited from

[CDNConstructProps](CDNConstructProps).[removalPolicy](CDNConstructProps#removalpolicy)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:31](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/stacks/cdn/CDNConstruct.ts#L31)

___

### rootDomain

• `Optional` **rootDomain**: `string`

Allows hosting at a custom, non-cloudfront, url.  The root domain
of the website that is being hosted without the sub-domain. ie. `example.com`.
If provided, must also provide a value for `stage`, `hostedZone` and `certificate`.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[rootDomain](CDNConstructProps#rootdomain)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:76](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/stacks/cdn/CDNConstruct.ts#L76)

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

### stage

• `Optional` **stage**: `string`

The stage of the website that is being hosted. ex. Using `qa`
as the stage will host the site at the sub-domain `qa.example.com`.  When
the stage is prod a naked domain will be used and the `buildWwwSubdomain`
property will be checked.  If `true` the `www` sub-domain will also be built.
ex. `www.example.com` and `example.com` will both be valid.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[stage](CDNConstructProps#stage)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:85](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/stacks/cdn/CDNConstruct.ts#L85)

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

### useExistingBucket

• `Optional` **useExistingBucket**: false \| true

This is for accounts/clients that have high security and restrict making
buckets.  Also helpful during development and forget to delete a bucket.
Will not throw and error when deploying.  Sets up a BucketPolicy for
access to the existing bucket. When set to `true`, you must also provide
the `bucketName`

#### Inherited from

[CDNConstructProps](CDNConstructProps).[useExistingBucket](CDNConstructProps#useexistingbucket)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:58](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/stacks/cdn/CDNConstruct.ts#L58)
