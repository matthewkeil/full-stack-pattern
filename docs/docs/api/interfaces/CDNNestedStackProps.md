---
id: "CDNNestedStackProps"
title: "Interface: CDNNestedStackProps"
sidebar_label: "CDNNestedStackProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Omit`<`NestedStackProps`, ``"removalPolicy"`` \| ``"timeout"``\>

- [`CDNConstructProps`](CDNConstructProps)

  ↳ **`CDNNestedStackProps`**

## Properties

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

[src/stacks/cdn/CDNConstruct.ts:113](https://github.com/matthewkeil/full-stack-pattern/blob/ddee7ab/src/stacks/cdn/CDNConstruct.ts#L113)

___

### bucketName

• `Optional` **bucketName**: `string`

Set the bucketName

#### Inherited from

[CDNConstructProps](CDNConstructProps).[bucketName](CDNConstructProps#bucketname)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:69](https://github.com/matthewkeil/full-stack-pattern/blob/ddee7ab/src/stacks/cdn/CDNConstruct.ts#L69)

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

[src/stacks/cdn/CDNConstruct.ts:111](https://github.com/matthewkeil/full-stack-pattern/blob/ddee7ab/src/stacks/cdn/CDNConstruct.ts#L111)

___

### buildWwwSubdomain

• `Optional` **buildWwwSubdomain**: false \| true

will build www.{rootDomain} alias on `prod` stage in addition
to the naked rootDomain. For non-production stages, this is a no-op.

**`default`** true

#### Inherited from

[CDNConstructProps](CDNConstructProps).[buildWwwSubdomain](CDNConstructProps#buildwwwsubdomain)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:93](https://github.com/matthewkeil/full-stack-pattern/blob/ddee7ab/src/stacks/cdn/CDNConstruct.ts#L93)

___

### certificate

• `Optional` **certificate**: `ICertificate`

The TLS/SSL certificate to use for the distribution.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[certificate](CDNConstructProps#certificate)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:103](https://github.com/matthewkeil/full-stack-pattern/blob/ddee7ab/src/stacks/cdn/CDNConstruct.ts#L103)

___

### codePaths

• **codePaths**: `string`[]

The absolute paths for the code that will be uploaded and
hosted via S3/CloudFront.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[codePaths](CDNConstructProps#codepaths)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:49](https://github.com/matthewkeil/full-stack-pattern/blob/ddee7ab/src/stacks/cdn/CDNConstruct.ts#L49)

___

### deploymentRole

• `Optional` **deploymentRole**: `IRole`

Deployment role to use when publishing files to S3.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[deploymentRole](CDNConstructProps#deploymentrole)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:135](https://github.com/matthewkeil/full-stack-pattern/blob/ddee7ab/src/stacks/cdn/CDNConstruct.ts#L135)

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

Option to not use fixed logicalId's for the RestApi resource. For more
info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Inherited from

[CDNConstructProps](CDNConstructProps).[dontOverrideLogicalId](CDNConstructProps#dontoverridelogicalid)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:43](https://github.com/matthewkeil/full-stack-pattern/blob/ddee7ab/src/stacks/cdn/CDNConstruct.ts#L43)

___

### hostedZone

• `Optional` **hostedZone**: `IHostedZone`

HostedZone to add Distribution AliasRecords to.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[hostedZone](CDNConstructProps#hostedzone)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:98](https://github.com/matthewkeil/full-stack-pattern/blob/ddee7ab/src/stacks/cdn/CDNConstruct.ts#L98)

___

### noBucketPolicy

• `Optional` **noBucketPolicy**: false \| true

This is for accounts/clients that have high security and restrict making
bucket policies. Has no effect unless `props.useExistingBucket = true`

#### Inherited from

[CDNConstructProps](CDNConstructProps).[noBucketPolicy](CDNConstructProps#nobucketpolicy)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:64](https://github.com/matthewkeil/full-stack-pattern/blob/ddee7ab/src/stacks/cdn/CDNConstruct.ts#L64)

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

The prefix to use for the resources.  Will prefix all resource names with this value. For more info, see
[Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Inherited from

[CDNConstructProps](CDNConstructProps).[prefix](CDNConstructProps#prefix)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:37](https://github.com/matthewkeil/full-stack-pattern/blob/ddee7ab/src/stacks/cdn/CDNConstruct.ts#L37)

___

### removalPolicy

• `Optional` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

#### Inherited from

[CDNConstructProps](CDNConstructProps).[removalPolicy](CDNConstructProps#removalpolicy)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:31](https://github.com/matthewkeil/full-stack-pattern/blob/ddee7ab/src/stacks/cdn/CDNConstruct.ts#L31)

___

### rootDomain

• `Optional` **rootDomain**: `string`

Allows hosting at a custom, non-cloudfront, url.  The root domain
of the website that is being hosted without the sub-domain. ie. `example.com`.
If provided, must also provide a value for `stage`, `hostedZone` and `certificate`.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[rootDomain](CDNConstructProps#rootdomain)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:76](https://github.com/matthewkeil/full-stack-pattern/blob/ddee7ab/src/stacks/cdn/CDNConstruct.ts#L76)

___

### stackTimeout

• `Optional` **stackTimeout**: `Duration`

#### Defined in

[src/stacks/cdn/CDNNestedStack.ts:9](https://github.com/matthewkeil/full-stack-pattern/blob/ddee7ab/src/stacks/cdn/CDNNestedStack.ts#L9)

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

[src/stacks/cdn/CDNConstruct.ts:85](https://github.com/matthewkeil/full-stack-pattern/blob/ddee7ab/src/stacks/cdn/CDNConstruct.ts#L85)

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

[src/stacks/cdn/CDNConstruct.ts:58](https://github.com/matthewkeil/full-stack-pattern/blob/ddee7ab/src/stacks/cdn/CDNConstruct.ts#L58)
