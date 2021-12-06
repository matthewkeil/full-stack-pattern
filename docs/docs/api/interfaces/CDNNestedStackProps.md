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

| Name | Type |
| :------ | :------ |
| `apiPathPattern?` | `string` |
| `apiStage?` | `string` |
| `restApi` | `IRestApi` |

#### Inherited from

[CDNConstructProps](CDNConstructProps).[api](CDNConstructProps#api)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:93](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cdn/CDNConstruct.ts#L93)

___

### bucketName

• `Optional` **bucketName**: `string`

**`description`** When using an existing bucket, pass in the bucketName that should
be used.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[bucketName](CDNConstructProps#bucketname)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:50](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cdn/CDNConstruct.ts#L50)

___

### bucketProps

• `Optional` **bucketProps**: `Pick`<`BucketProps`, ``"bucketName"`` \| ``"encryptionKey"`` \| ``"encryption"`` \| ``"enforceSSL"`` \| ``"bucketKeyEnabled"`` \| ``"versioned"`` \| ``"lifecycleRules"`` \| ``"websiteIndexDocument"`` \| ``"websiteErrorDocument"`` \| ``"websiteRedirect"`` \| ``"websiteRoutingRules"`` \| ``"accessControl"`` \| ``"publicReadAccess"`` \| ``"blockPublicAccess"`` \| ``"metrics"`` \| ``"cors"`` \| ``"serverAccessLogsBucket"`` \| ``"serverAccessLogsPrefix"`` \| ``"inventories"`` \| ``"objectOwnership"``\>

**`description`** Optional. If creating the hosting bucket, these props will be
passed to the Bucket construct. To set removal policy use
`CDNConstructProps.removalPolicy`.  When removalPolicy is set to DESTROY,
which is the default behavior, autoDeleteObjects will be enabled.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[bucketProps](CDNConstructProps#bucketprops)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:91](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cdn/CDNConstruct.ts#L91)

___

### buildWwwSubdomain

• `Optional` **buildWwwSubdomain**: false \| true

**`default`** true

**`description`** will build www.{rootDomain} alias on `prod` stage in addition
to the naked rootDomain. For non-production stages, this is a no-op.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[buildWwwSubdomain](CDNConstructProps#buildwwwsubdomain)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:73](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cdn/CDNConstruct.ts#L73)

___

### certificate

• `Optional` **certificate**: `ICertificate`

**`description`** The TLS/SSL certificate to use for the distribution.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[certificate](CDNConstructProps#certificate)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:83](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cdn/CDNConstruct.ts#L83)

___

### codePaths

• **codePaths**: `string`[]

**`description`** The absolute paths for the code that will be uploaded and
hosted via S3/CloudFront.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[codePaths](CDNConstructProps#codepaths)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:44](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cdn/CDNConstruct.ts#L44)

___

### deploymentRole

• `Optional` **deploymentRole**: `IRole`

**`description`** Optional. Deployment role to use when publishing files to S3.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[deploymentRole](CDNConstructProps#deploymentrole)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:113](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cdn/CDNConstruct.ts#L113)

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

#### Inherited from

[CDNConstructProps](CDNConstructProps).[dontOverrideLogicalId](CDNConstructProps#dontoverridelogicalid)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:36](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cdn/CDNConstruct.ts#L36)

___

### hostedZone

• `Optional` **hostedZone**: `IHostedZone`

**`description`** HostedZone to add Distribution AliasRecords to.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[hostedZone](CDNConstructProps#hostedzone)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:78](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cdn/CDNConstruct.ts#L78)

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

[CDNConstructProps](CDNConstructProps).[prefix](CDNConstructProps#prefix)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:34](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cdn/CDNConstruct.ts#L34)

___

### removalPolicy

• `Optional` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

#### Inherited from

[CDNConstructProps](CDNConstructProps).[removalPolicy](CDNConstructProps#removalpolicy)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:38](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cdn/CDNConstruct.ts#L38)

___

### rootDomain

• `Optional` **rootDomain**: `string`

**`description`** Allows hosting at a custom, non-cloudfront, url.  The root domain
of the website that is being hosted without the sub-domain. ie. `example.com`.
If provided, must also provide a value for `stage`, `hostedZone` and `certificate`.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[rootDomain](CDNConstructProps#rootdomain)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:57](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cdn/CDNConstruct.ts#L57)

___

### stackTimeout

• `Optional` **stackTimeout**: `Duration`

#### Defined in

[src/stacks/cdn/CDNNestedStack.ts:10](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cdn/CDNNestedStack.ts#L10)

___

### stage

• `Optional` **stage**: `string`

**`description`** The stage of the website that is being hosted. ex. Using `qa`
as the stage will host the site at the sub-domain `qa.example.com`.  When
the stage is prod a naked domain will be used and the `buildWwwSubdomain`
property will be checked.  If `true` the `www` sub-domain will also be built.
ex. `www.example.com` and `example.com` will both be valid.

#### Inherited from

[CDNConstructProps](CDNConstructProps).[stage](CDNConstructProps#stage)

#### Defined in

[src/stacks/cdn/CDNConstruct.ts:66](https://github.com/matthewkeil/full-stack-pattern/blob/a1528c9/src/stacks/cdn/CDNConstruct.ts#L66)
