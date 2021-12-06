import {
  Table as BaseTable,
  TableEncryption,
  Attribute as BaseAttribute,
  AttributeType as BaseAttributeType,
  TableProps as BaseTableProps,
  GlobalSecondaryIndexProps,
  LocalSecondaryIndexProps,
  CfnTable,
  BillingMode
} from '@aws-cdk/aws-dynamodb';
import { Construct, RemovalPolicy } from '@aws-cdk/core';

import { Mutable, toPascal } from '../../lib';

const dynamoAttributeTypes = ['string', 'number', 'boolean'] as const;
type AttributeType = typeof dynamoAttributeTypes[number];
export type DynamoAttribute = {
  [attributeName: string]: AttributeType;
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
   * ```typescript
   * type DynamoAttribute = { [attributeName: string]: 'string' | 'number' | 'boolean' }
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
   * ```
   *
   * I find this syntax a bit verbose and prefer to not need to import the
   * enum into my projects so I shortened the syntax.
   */
  partitionKey: DynamoAttribute;

  /**
   * Sort key for the table. Uses the format of:
   *
   * ```typescript
   * type DynamoAttribute = { [attributeName: string]: 'string' | 'number' | 'boolean' }
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
   * ```
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

export class Table extends BaseTable {
  public name: string;

  constructor(scope: Construct, id: string, props: TableProps) {
    super(scope, id + 'BaseTable', {
      ...props,
      tableName: props.prefix ? `${props.prefix}-${props.name}` : props.name,
      partitionKey: Table.convertAttribute(props.partitionKey),
      sortKey: props.sortKey ? Table.convertAttribute(props.sortKey) : undefined,
      billingMode: BillingMode.PAY_PER_REQUEST,
      encryption: props.encryption
        ? props.encryption
        : props.encryptionKey
        ? TableEncryption.CUSTOMER_MANAGED
        : undefined,
      removalPolicy: props.removalPolicy ? props.removalPolicy : RemovalPolicy.DESTROY
    });

    const { name, logicalId, lsi, gsi } = props;
    this.name = name;

    if (props.dontOverrideLogicalId !== true) {
      (this.node.defaultChild as CfnTable).overrideLogicalId(
        logicalId
          ? logicalId
          : props.prefix
          ? toPascal(`${props.prefix}-${props.name}-table`)
          : `${toPascal(props.name)}Table`
      );
    }

    if (gsi) {
      for (const index of gsi) {
        this.addGlobalSecondaryIndex({
          ...index,
          partitionKey: Table.convertAttribute(index.partitionKey),
          sortKey: index.sortKey ? Table.convertAttribute(index.sortKey) : undefined
        });
      }
    }
    if (lsi) {
      for (const index of lsi) {
        this.addLocalSecondaryIndex({
          ...index,
          sortKey: Table.convertAttribute(index.sortKey)
        });
      }
    }
  }

  private static convertAttribute(attribute: DynamoAttribute): BaseAttribute {
    const [attributeName, attributeType] = Object.entries(attribute)[0];
    return {
      name: attributeName,
      type:
        attributeType === 'string'
          ? BaseAttributeType.STRING
          : attributeType === 'number'
          ? BaseAttributeType.NUMBER
          : BaseAttributeType.BINARY
    };
  }
}
