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
interface LsiProps extends Omit<LocalSecondaryIndexProps, OmittedIndexProps> {
  sortKey: DynamoAttribute;
}
interface GsiProps extends Omit<GlobalSecondaryIndexProps, OmittedIndexProps> {
  partitionKey: DynamoAttribute;
  sortKey?: DynamoAttribute;
}
export interface TableProps extends Mutable<Omit<BaseTableProps, OmittedIndexProps | 'tableName'>> {
  name: string;
  prefix?: string;
  partitionKey: DynamoAttribute;
  sortKey?: DynamoAttribute;
  lsi?: LsiProps[];
  gsi?: GsiProps[];
  logicalId?: string;
  dontOverrideLogicalId?: boolean;
}

export class Table extends Construct {
  public table: BaseTable
  constructor(scope: Construct, id: string, private props: TableProps) {
    super(scope, id);
    const { name, logicalId, lsi, gsi } = props;
    const pascalName = toPascal(name);
    const tableName = this.props.prefix ? `${this.props.prefix}-${name}` : name;

    this.table = new BaseTable(this, pascalName, {
      ...props,
      tableName,
      partitionKey: this.convertAttribute(this.props.partitionKey),
      sortKey: this.props.sortKey ? this.convertAttribute(this.props.sortKey) : undefined,
      billingMode: BillingMode.PAY_PER_REQUEST,
      encryption: props.encryption
        ? props.encryption
        : props.encryptionKey
        ? TableEncryption.CUSTOMER_MANAGED
        : undefined,
      removalPolicy: props.removalPolicy ? props.removalPolicy : RemovalPolicy.DESTROY
    });
    if (props.dontOverrideLogicalId !== true) {
      (this.table.node.defaultChild as CfnTable).overrideLogicalId(logicalId ? logicalId : pascalName);
    }

    if (gsi) {
      for (const index of gsi) {
        this.table.addGlobalSecondaryIndex({
          ...index,
          partitionKey: this.convertAttribute(index.partitionKey),
          sortKey: index.sortKey ? this.convertAttribute(index.sortKey) : undefined
        });
      }
    }
    if (lsi) {
      for (const index of lsi) {
        this.table.addLocalSecondaryIndex({
          ...index,
          sortKey: this.convertAttribute(index.sortKey)
        });
      }
    }
  }

  private convertAttribute(attribute: DynamoAttribute): BaseAttribute {
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
