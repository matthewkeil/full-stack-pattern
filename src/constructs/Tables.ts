import { ITable } from '@aws-cdk/aws-dynamodb';
import { Construct } from '@aws-cdk/core';

import { mergeProps } from '../../lib';
import { OmittedIndexProps, TableProps, Table } from './Table';

type OmittedTablesProps = OmittedIndexProps | 'tableName' | 'name' | 'logicalId' | 'lsi' | 'gsi';
export interface TablesProps extends Omit<TableProps, OmittedTablesProps> {
  prefix?: string;
  tables?: TableProps[];
  existingTables?: string[];
}
export class Tables extends Construct {
  public resources: { [tableName: string]: ITable } = {};
  private globalProps: Omit<TablesProps, 'tables'>;

  constructor(scope: Construct, id: string, private props: TablesProps) {
    super(scope, id);
    this.globalProps = mergeProps(props, { tables: undefined });

    for (const table of props.tables ?? []) {
      this.addTable(table);
    }
  }

  public addTable(tableProps: TableProps) {
    const props = mergeProps(this.globalProps, tableProps);
    const table = new Table(this, `${tableProps.name}`, props);
    this.resources[tableProps.name] = table.table;
    return table.table;
  }
}
