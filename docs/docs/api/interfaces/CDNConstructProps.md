---
id: "CDNConstructProps"
title: "Interface: CDNConstructProps"
sidebar_label: "CDNConstructProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`CDNConstructProps`**

  ↳ [`CDNStackProps`](CDNStackProps)

  ↳ [`CDNNestedStackProps`](CDNNestedStackProps)

## Properties

### api

• `Optional` **api**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiPathPattern?` | `string` | The url paths that will be forwarded to the api.  **`default`** "/api/*" |
| `apiStage?` | `string` | The api stage (path suffix) at the end of the execute domain.  **`default`** "/prod" |
| `restApi` | `IRestApi` | The RestApi that is being hit via CloudFront. |

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:113](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/stacks/cdn/CDNConstruct.ts#L113)

___

### bucketName

• `Optional` **bucketName**: `string`

Set the bucketName

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:69](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/stacks/cdn/CDNConstruct.ts#L69)

___

### bucketProps

• `Optional` **bucketProps**: `Pick`<`BucketProps`, ``"bucketName"`` \| ``"encryptionKey"`` \| ``"encryption"`` \| ``"enforceSSL"`` \| ``"bucketKeyEnabled"`` \| ``"versioned"`` \| ``"lifecycleRules"`` \| ``"websiteIndexDocument"`` \| ``"websiteErrorDocument"`` \| ``"websiteRedirect"`` \| ``"websiteRoutingRules"`` \| ``"accessControl"`` \| ``"publicReadAccess"`` \| ``"blockPublicAccess"`` \| ``"metrics"`` \| ``"cors"`` \| ``"serverAccessLogsBucket"`` \| ``"serverAccessLogsPrefix"`` \| ``"inventories"`` \| ``"objectOwnership"``\>

Optional. If creating the hosting bucket, these props will be
passed to the Bucket construct. To set removal policy use
`CDNConstructProps.removalPolicy`.  When removalPolicy is set to DESTROY,
which is the default behavior, autoDeleteObjects will be enabled.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:111](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/stacks/cdn/CDNConstruct.ts#L111)

___

### buildWwwSubdomain

• `Optional` **buildWwwSubdomain**: false \| true

will build www.{rootDomain} alias on `prod` stage in addition
to the naked rootDomain. For non-production stages, this is a no-op.

**`default`** true

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:93](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/stacks/cdn/CDNConstruct.ts#L93)

___

### certificate

• `Optional` **certificate**: `ICertificate`

The TLS/SSL certificate to use for the distribution.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:103](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/stacks/cdn/CDNConstruct.ts#L103)

___

### codePaths

• **codePaths**: `string`[]

The absolute paths for the code that will be uploaded and
hosted via S3/CloudFront.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:49](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/stacks/cdn/CDNConstruct.ts#L49)

___

### deploymentRole

• `Optional` **deploymentRole**: `IRole`

Deployment role to use when publishing files to S3.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:135](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/stacks/cdn/CDNConstruct.ts#L135)

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

Option to not use fixed logicalId's for the RestApi resource. For more
info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:43](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/stacks/cdn/CDNConstruct.ts#L43)

___

### hostedZone

• `Optional` **hostedZone**: `IHostedZone`

HostedZone to add Distribution AliasRecords to.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:98](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/stacks/cdn/CDNConstruct.ts#L98)

___

### noBucketPolicy

• `Optional` **noBucketPolicy**: false \| true

This is for accounts/clients that have high security and restrict making
bucket policies. Has no effect unless `props.useExistingBucket = true`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:64](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/stacks/cdn/CDNConstruct.ts#L64)

___

### prefix

• `Optional` **prefix**: `string`

The prefix to use for the resources.  Will prefix all resource names with this value. For more info, see
[Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:37](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/stacks/cdn/CDNConstruct.ts#L37)

___

### removalPolicy

• `Optional` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:31](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/stacks/cdn/CDNConstruct.ts#L31)

___

### rootDomain

• `Optional` **rootDomain**: `string`

Allows hosting at a custom, non-cloudfront, url.  The root domain
of the website that is being hosted without the sub-domain. ie. `example.com`.
If provided, must also provide a value for `stage`, `hostedZone` and `certificate`.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:76](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/stacks/cdn/CDNConstruct.ts#L76)

___

### stage

• `Optional` **stage**: `string`

The stage of the website that is being hosted. ex. Using `qa`
as the stage will host the site at the sub-domain `qa.example.com`.  When
the stage is prod a naked domain will be used and the `buildWwwSubdomain`
property will be checked.  If `true` the `www` sub-domain will also be built.
ex. `www.example.com` and `example.com` will both be valid.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:85](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/stacks/cdn/CDNConstruct.ts#L85)

___

### useExistingBucket

• `Optional` **useExistingBucket**: false \| true

This is for accounts/clients that have high security and restrict making
buckets.  Also helpful during development and forget to delete a bucket.
Will not throw and error when deploying.  Sets up a BucketPolicy for
access to the existing bucket. When set to `true`, you must also provide
the `bucketName`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:58](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/stacks/cdn/CDNConstruct.ts#L58)
