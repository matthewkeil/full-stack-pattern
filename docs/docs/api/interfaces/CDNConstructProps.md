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

[src/stacks/cdn/CDNConstruct.ts:102](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L102)

___

### bucketName

• `Optional` **bucketName**: `string`

When using an existing bucket, pass in the bucketName that should
be used.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:58](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L58)

___

### bucketProps

• `Optional` **bucketProps**: `Pick`<`BucketProps`, ``"bucketName"`` \| ``"encryptionKey"`` \| ``"encryption"`` \| ``"enforceSSL"`` \| ``"bucketKeyEnabled"`` \| ``"versioned"`` \| ``"lifecycleRules"`` \| ``"websiteIndexDocument"`` \| ``"websiteErrorDocument"`` \| ``"websiteRedirect"`` \| ``"websiteRoutingRules"`` \| ``"accessControl"`` \| ``"publicReadAccess"`` \| ``"blockPublicAccess"`` \| ``"metrics"`` \| ``"cors"`` \| ``"serverAccessLogsBucket"`` \| ``"serverAccessLogsPrefix"`` \| ``"inventories"`` \| ``"objectOwnership"``\>

Optional. If creating the hosting bucket, these props will be
passed to the Bucket construct. To set removal policy use
`CDNConstructProps.removalPolicy`.  When removalPolicy is set to DESTROY,
which is the default behavior, autoDeleteObjects will be enabled.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:100](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L100)

___

### buildWwwSubdomain

• `Optional` **buildWwwSubdomain**: false \| true

will build www.{rootDomain} alias on `prod` stage in addition
to the naked rootDomain. For non-production stages, this is a no-op.

**`default`** true

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:82](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L82)

___

### certificate

• `Optional` **certificate**: `ICertificate`

The TLS/SSL certificate to use for the distribution.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:92](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L92)

___

### codePaths

• **codePaths**: `string`[]

The absolute paths for the code that will be uploaded and
hosted via S3/CloudFront.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:52](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L52)

___

### deploymentRole

• `Optional` **deploymentRole**: `IRole`

Deployment role to use when publishing files to S3.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:124](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L124)

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

Option to not use fixed logicalId's for the RestApi resource. For more
info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:46](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L46)

___

### hostedZone

• `Optional` **hostedZone**: `IHostedZone`

HostedZone to add Distribution AliasRecords to.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:87](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L87)

___

### prefix

• `Optional` **prefix**: `string`

The prefix to use for the resources.  Will prefix all resource names with this value. For more info, see
[Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:40](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L40)

___

### removalPolicy

• `Optional` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:34](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L34)

___

### rootDomain

• `Optional` **rootDomain**: `string`

Allows hosting at a custom, non-cloudfront, url.  The root domain
of the website that is being hosted without the sub-domain. ie. `example.com`.
If provided, must also provide a value for `stage`, `hostedZone` and `certificate`.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:65](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L65)

___

### stage

• `Optional` **stage**: `string`

The stage of the website that is being hosted. ex. Using `qa`
as the stage will host the site at the sub-domain `qa.example.com`.  When
the stage is prod a naked domain will be used and the `buildWwwSubdomain`
property will be checked.  If `true` the `www` sub-domain will also be built.
ex. `www.example.com` and `example.com` will both be valid.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:74](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/stacks/cdn/CDNConstruct.ts#L74)
