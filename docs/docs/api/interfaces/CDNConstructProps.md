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

| Name | Type |
| :------ | :------ |
| `apiPathPattern?` | `string` |
| `apiStage?` | `string` |
| `restApi` | `IRestApi` |

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:93](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/cdn/CDNConstruct.ts#L93)

___

### bucketName

• `Optional` **bucketName**: `string`

**`description`** When using an existing bucket, pass in the bucketName that should
be used.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:50](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/cdn/CDNConstruct.ts#L50)

___

### bucketProps

• `Optional` **bucketProps**: `Pick`<`BucketProps`, ``"bucketName"`` \| ``"encryptionKey"`` \| ``"encryption"`` \| ``"enforceSSL"`` \| ``"bucketKeyEnabled"`` \| ``"versioned"`` \| ``"lifecycleRules"`` \| ``"websiteIndexDocument"`` \| ``"websiteErrorDocument"`` \| ``"websiteRedirect"`` \| ``"websiteRoutingRules"`` \| ``"accessControl"`` \| ``"publicReadAccess"`` \| ``"blockPublicAccess"`` \| ``"metrics"`` \| ``"cors"`` \| ``"serverAccessLogsBucket"`` \| ``"serverAccessLogsPrefix"`` \| ``"inventories"`` \| ``"objectOwnership"``\>

**`description`** Optional. If creating the hosting bucket, these props will be
passed to the Bucket construct. To set removal policy use
`CDNConstructProps.removalPolicy`.  When removalPolicy is set to DESTROY,
which is the default behavior, autoDeleteObjects will be enabled.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:91](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/cdn/CDNConstruct.ts#L91)

___

### buildWwwSubdomain

• `Optional` **buildWwwSubdomain**: false \| true

**`default`** true

**`description`** will build www.{rootDomain} alias on `prod` stage in addition
to the naked rootDomain. For non-production stages, this is a no-op.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:73](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/cdn/CDNConstruct.ts#L73)

___

### certificate

• `Optional` **certificate**: `ICertificate`

**`description`** The TLS/SSL certificate to use for the distribution.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:83](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/cdn/CDNConstruct.ts#L83)

___

### codePaths

• **codePaths**: `string`[]

**`description`** The absolute paths for the code that will be uploaded and
hosted via S3/CloudFront.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:44](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/cdn/CDNConstruct.ts#L44)

___

### deploymentRole

• `Optional` **deploymentRole**: `IRole`

**`description`** Optional. Deployment role to use when publishing files to S3.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:113](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/cdn/CDNConstruct.ts#L113)

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:36](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/cdn/CDNConstruct.ts#L36)

___

### hostedZone

• `Optional` **hostedZone**: `IHostedZone`

**`description`** HostedZone to add Distribution AliasRecords to.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:78](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/cdn/CDNConstruct.ts#L78)

___

### prefix

• **prefix**: `string`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:34](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/cdn/CDNConstruct.ts#L34)

___

### removalPolicy

• `Optional` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:38](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/cdn/CDNConstruct.ts#L38)

___

### rootDomain

• `Optional` **rootDomain**: `string`

**`description`** Allows hosting at a custom, non-cloudfront, url.  The root domain
of the website that is being hosted without the sub-domain. ie. `example.com`.
If provided, must also provide a value for `stage`, `hostedZone` and `certificate`.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:57](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/cdn/CDNConstruct.ts#L57)

___

### stage

• `Optional` **stage**: `string`

**`description`** The stage of the website that is being hosted. ex. Using `qa`
as the stage will host the site at the sub-domain `qa.example.com`.  When
the stage is prod a naked domain will be used and the `buildWwwSubdomain`
property will be checked.  If `true` the `www` sub-domain will also be built.
ex. `www.example.com` and `example.com` will both be valid.

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:66](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/cdn/CDNConstruct.ts#L66)
