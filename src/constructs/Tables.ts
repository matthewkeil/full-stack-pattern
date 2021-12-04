import {
  BillingMode,
  Table,
  ITable,
  TableEncryption,
  Attribute as BaseAttribute,
  AttributeType as BaseAttributeType,
  TableProps as BaseTableProps,
  GlobalSecondaryIndexProps,
  LocalSecondaryIndexProps,
  CfnTable
} from '@aws-cdk/aws-dynamodb';
import { Construct, RemovalPolicy } from '@aws-cdk/core';

import { toPascal, mergeProps } from '../../lib';

const dynamoAttributeTypes = ['string', 'number', 'boolean'] as const;
type AttributeType = typeof dynamoAttributeTypes[number];
export type DynamoAttribute = {
  [attributeName: string]: AttributeType;
};

type OmittedIndexProps = 'partitionKey' | 'sortKey';
interface LsiProps extends Omit<LocalSecondaryIndexProps, OmittedIndexProps> {
  sortKey: DynamoAttribute;
}
interface GsiProps extends Omit<GlobalSecondaryIndexProps, OmittedIndexProps> {
  partitionKey: DynamoAttribute;
  sortKey?: DynamoAttribute;
}
export interface TableProps extends Omit<BaseTableProps, OmittedIndexProps | 'tableName'> {
  name: string;
  logicalId: string;
  partitionKey: DynamoAttribute;
  sortKey?: DynamoAttribute;
  lsi?: LsiProps[];
  gsi?: GsiProps[];
}
type OmittedTablesProps = OmittedIndexProps | 'tableName' | 'name' | 'logicalId' | 'lsi' | 'gsi';
export interface TablesProps extends Omit<TableProps, OmittedTablesProps> {
  prefix?: string;
  tables?: TableProps[];
  existingTables?: string[];
}

const DEFAULT_PROPS = {
  billingMode: BillingMode.PAY_PER_REQUEST
} as TableProps;

export class Tables extends Construct {
  public resources: { [tableName: string]: ITable } = {};
  private globalProps: Omit<TablesProps, 'tables'>;

  constructor(scope: Construct, id: string, private props: TablesProps) {
    super(scope, id);
    this.globalProps = mergeProps(DEFAULT_PROPS, props, { tables: undefined });

    for (const table of props.tables ?? []) {
      this.addTable(table);
    }
  }

  public addTable(tableProps: TableProps) {
    const { name, logicalId, lsi, gsi } = tableProps;
    const pascalName = toPascal(name);
    const props = mergeProps(this.globalProps, tableProps);

    const tableName = this.props.prefix ? `${this.props.prefix}-${name}` : name;
    if (this.props.existingTables?.includes(tableName)) {
      throw new Error('Attempting to create a table that already exists');
    }

    const table = new Table(this, pascalName, {
      ...props,
      tableName,
      partitionKey: this.convertAttribute(tableProps.partitionKey),
      sortKey: tableProps.sortKey ? this.convertAttribute(tableProps.sortKey) : undefined,
      encryption: props.encryption
        ? props.encryption
        : props.encryptionKey
        ? TableEncryption.CUSTOMER_MANAGED
        : undefined,
      removalPolicy: props.removalPolicy ? props.removalPolicy : RemovalPolicy.DESTROY
    });
    (table.node.defaultChild as CfnTable).overrideLogicalId(logicalId ? logicalId : pascalName);

    if (gsi) {
      for (const index of gsi) {
        table.addGlobalSecondaryIndex({
          ...index,
          partitionKey: this.convertAttribute(index.partitionKey),
          sortKey: index.sortKey ? this.convertAttribute(index.sortKey) : undefined
        });
      }
    }
    if (lsi) {
      for (const index of lsi) {
        table.addLocalSecondaryIndex({
          ...index,
          sortKey: this.convertAttribute(index.sortKey)
        });
      }
    }

    this.resources[name] = table;
    return table;
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
