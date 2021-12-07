---
sidebar_position: 5
---

# Table

Extends the functionality of the L2 Table construct. Allows creation of lsi's and gsi's from the props object at construction. Also allows flexibility to use existing logicalId's for in-place updates of tables there were created with a non-cdk framework. Also makes partition and sort keys easier to setup. See example usage below.

## TableProps

See [TableProps](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-dynamodb.TableProps.html) for more information about what is available on the L2 cdk construct

```typescript
export type DynamoAttribute = {
  [attributeName: string]: 'string' | 'number' | 'boolean';
};

export type OmittedIndexProps = 'partitionKey' | 'sortKey';

export interface LsiProps extends Omit<LocalSecondaryIndexProps, OmittedIndexProps> {
  sortKey: DynamoAttribute;
}

export interface GsiProps extends Omit<GlobalSecondaryIndexProps, OmittedIndexProps> {
  partitionKey: DynamoAttribute;
  sortKey?: DynamoAttribute;
}

export interface TableProps extends Mutable<Omit<BaseTableProps, OmittedIndexProps | 'tableName'>> {
  /**
   * The name of the resource to make.  Generally this is a few short words.  When passing `prefix` and
   * `name` the physical name of resources will take the format of `${prefix}-${name}`.  If just name is passed
   * it will just be the value of `name`
   */
  name: string;

  /**
   * The prefix to use for the resources.  Will prefix all resource names with this value. For more info, see
   * [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   */
  prefix?: string;

  /**
   * Partition key for the table. Uses the format of:
   *
   * // Example:
   * partitionKey: {
   *   id: 'string',
   * }
   *
   * // Instead of natively:
   * partitionKey: {
   *   name: 'id',
   *   type: AttributeType.STRING
   * }
   *
   * I find this syntax a bit verbose and prefer to not need to import the
   * enum into my projects so I shortened the syntax.
   */
  partitionKey: DynamoAttribute;

  /**
   * Sort key for the table. Uses the format of:
   *
   * // Example:
   * partitionKey: {
   *   id: 'string',
   * }
   *
   * // Instead of natively:
   * partitionKey: {
   *   name: 'id',
   *   type: AttributeType.STRING
   * }
   *
   * I find this syntax a bit verbose and prefer to not need to import the
   * enum into my projects so I shortened the syntax.
   */
  sortKey?: DynamoAttribute;

  /**
   * Array of Local Secondary Indexes. LsiProps extend LocalSecondaryIndexProps
   * but use this constructs syntax for the sortKey.
   */
  lsi?: LsiProps[];

  /**
   * Array of Local Secondary Indexes. LsiProps extend LocalSecondaryIndexProps
   * but use this constructs syntax for the partitionKey and sortKey.
   */
  gsi?: GsiProps[];

  /**
   * LogicalId for the RestApi resource for in-place upgrades. For more
   * info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   */
  logicalId?: string;

  /**
   * Option to not use fixed logicalId's for the RestApi resource. For more
   * info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   */
  dontOverrideLogicalId?: boolean;
}
```

## Example Usage

```typescript
import { Table } from 'ful-stack-pattern';

interface FancyStackProps {
  prefix: string;
}

class FancyStack extends Stack {
  constructor(scope: Construct, id: string, props: FancyStackProps) {
    super(scope, id, props);

    const table = new Table(this, 'FancyTable', {
      name: 'fancy-table',
      prefix: props.prefix,
      partitionKey: {
        id: 'string'
      },
      sortKey: {
        date: 'number'
      }
    });
  }
}
```
