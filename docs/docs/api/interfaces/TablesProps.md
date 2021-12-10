---
id: "TablesProps"
title: "Interface: TablesProps"
sidebar_label: "TablesProps"
sidebar_position: 0
custom_edit_url: null
---

Any prop that can be set on an individual table can be set on this
construct and all tables made in this group will have those values. Only
the props 'tableName', 'name', 'logicalId', 'lsi' and 'gsi' are available,
as those cannot be set for a group as they should be unique.

By default the individual props will get merged in with the ones set for
the group and anything specifically set on one table will supercede the
group values. Ie, if billingMode is set on the TablesProps as
BillingMode.PAY_PER_REQUEST and on an individual table, in the
TablesProps.tables array, as BillingMode.PROVISIONED, then the function will
use node BillingMode.PROVISIONED. See the Usage Example below.

## Hierarchy

- `Omit`<`TableProps`, `OmittedTablesProps`\>

  ↳ **`TablesProps`**

  ↳↳ [`ServerlessConstructProps`](ServerlessConstructProps)

## Properties

### billingMode

• `Optional` `Readonly` **billingMode**: `PAY_PER_REQUEST` \| `PROVISIONED`

Specify how you are charged for read and write throughput and how you manage capacity.

**`default`** PROVISIONED if `replicationRegions` is not specified, PAY_PER_REQUEST otherwise

**`stability`** stable

#### Inherited from

Omit.billingMode

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:187

___

### contributorInsightsEnabled

• `Optional` `Readonly` **contributorInsightsEnabled**: false \| true

Whether CloudWatch contributor insights is enabled.

**`default`** false

**`stability`** stable

#### Inherited from

Omit.contributorInsightsEnabled

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:282

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

Option to not use fixed logicalId's for the RestApi resource. For more
info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Inherited from

Omit.dontOverrideLogicalId

#### Defined in

[src/constructs/Table.ts:112](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Table.ts#L112)

___

### encryption

• `Optional` `Readonly` **encryption**: `DEFAULT` \| `CUSTOMER_MANAGED` \| `AWS_MANAGED`

Whether server-side encryption with an AWS managed customer master key is enabled.

This property cannot be set if `serverSideEncryption` is set.

**`default`** - server-side encryption is enabled with an AWS owned customer master key

**`stability`** stable

#### Inherited from

Omit.encryption

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:213

___

### encryptionKey

• `Optional` `Readonly` **encryptionKey**: `IKey`

External KMS key to use for table encryption.

This property can only be set if `encryption` is set to `TableEncryption.CUSTOMER_MANAGED`.

**`default`** - If `encryption` is set to `TableEncryption.CUSTOMER_MANAGED` and this
property is undefined, a new KMS key will be created and associated with this table.

**`stability`** stable

#### Inherited from

Omit.encryptionKey

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:223

___

### kinesisStream

• `Optional` `Readonly` **kinesisStream**: `IStream`

Kinesis Data Stream to capture item-level changes for the table.

**`default`** - no Kinesis Data Stream

**`stability`** stable

#### Inherited from

Omit.kinesisStream

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:303

___

### pointInTimeRecovery

• `Optional` `Readonly` **pointInTimeRecovery**: false \| true

Whether point-in-time recovery is enabled.

**`default`** - point-in-time recovery is disabled

**`stability`** stable

#### Inherited from

Omit.pointInTimeRecovery

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:194

___

### prefix

• `Optional` **prefix**: `string`

The prefix to use for the resources.  Will prefix all resource names with this value. For more info, see
[Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Inherited from

Omit.prefix

#### Defined in

[src/constructs/Table.ts:42](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Table.ts#L42)

___

### readCapacity

• `Optional` `Readonly` **readCapacity**: `number`

The read capacity for the table.

Careful if you add Global Secondary Indexes, as
those will share the table's provisioned throughput.

Can only be provided if billingMode is Provisioned.

**`default`** 5

**`stability`** stable

#### Inherited from

Omit.readCapacity

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:168

___

### removalPolicy

• `Optional` `Readonly` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

The removal policy to apply to the DynamoDB Table.

**`default`** RemovalPolicy.RETAIN

**`stability`** stable

#### Inherited from

Omit.removalPolicy

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:244

___

### replicationRegions

• `Optional` `Readonly` **replicationRegions**: `string`[]

Regions where replica tables will be created.

**`default`** - no replica tables are created

**`stability`** stable

#### Inherited from

Omit.replicationRegions

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:251

___

### replicationTimeout

• `Optional` `Readonly` **replicationTimeout**: `Duration`

The timeout for a table replication operation in a single region.

**`default`** Duration.minutes(30)

**`stability`** stable

#### Inherited from

Omit.replicationTimeout

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:258

___

### serverSideEncryption

• `Optional` `Readonly` **serverSideEncryption**: false \| true

(deprecated) Whether server-side encryption with an AWS managed customer master key is enabled.

This property cannot be set if `encryption` and/or `encryptionKey` is set.

**`default`** - server-side encryption is enabled with an AWS owned customer master key

**`deprecated`** This property is deprecated. In order to obtain the same behavior as
enabling this, set the `encryption` property to `TableEncryption.AWS_MANAGED` instead.

#### Inherited from

Omit.serverSideEncryption

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:204

___

### stream

• `Optional` `Readonly` **stream**: `NEW_IMAGE` \| `OLD_IMAGE` \| `NEW_AND_OLD_IMAGES` \| `KEYS_ONLY`

When an item in the table is modified, StreamViewType determines what information is written to the stream for this table.

**`default`** - streams are disabled unless `replicationRegions` is specified

**`stability`** stable

#### Inherited from

Omit.stream

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:237

___

### tables

• `Optional` **tables**: `TableProps`[]

Array of tablesProps to use for creation of multiple tables.

#### Defined in

[src/constructs/Tables.ts:25](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/constructs/Tables.ts#L25)

___

### timeToLiveAttribute

• `Optional` `Readonly` **timeToLiveAttribute**: `string`

The name of TTL attribute.

**`default`** - TTL is disabled

**`stability`** stable

#### Inherited from

Omit.timeToLiveAttribute

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:230

___

### waitForReplicationToFinish

• `Optional` `Readonly` **waitForReplicationToFinish**: false \| true

Indicates whether CloudFormation stack waits for replication to finish.

If set to false, the CloudFormation resource will mark the resource as
created and replication will be completed asynchronously. This property is
ignored if replicationRegions property is not set.

DO NOT UNSET this property if adding/removing multiple replicationRegions
in one deployment, as CloudFormation only supports one region replication
at a time. CDK overcomes this limitation by waiting for replication to
finish before starting new replicationRegion.

**`default`** true

**`see`** https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-globaltable.html#cfn-dynamodb-globaltable-replicas

**`stability`** stable

#### Inherited from

Omit.waitForReplicationToFinish

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:275

___

### writeCapacity

• `Optional` `Readonly` **writeCapacity**: `number`

The write capacity for the table.

Careful if you add Global Secondary Indexes, as
those will share the table's provisioned throughput.

Can only be provided if billingMode is Provisioned.

**`default`** 5

**`stability`** stable

#### Inherited from

Omit.writeCapacity

#### Defined in

node_modules/@aws-cdk/aws-dynamodb/lib/table.d.ts:180
