import { Construct } from '@aws-cdk/core';

import { mergeProps } from '../../lib/mergeProps';
import { OmittedIndexProps, TableProps, Table } from './Table';

type OmittedTablesProps = OmittedIndexProps | 'tableName' | 'name' | 'logicalId' | 'lsi' | 'gsi';

/**
 * Any prop that can be set on an individual table can be set on this
 * construct and all tables made in this group will have those values. Only
 * the props 'tableName', 'name', 'logicalId', 'lsi' and 'gsi' are available,
 * as those cannot be set for a group as they should be unique.
 *
 * By default the individual props will get merged in with the ones set for
 * the group and anything specifically set on one table will supercede the
 * group values. Ie, if billingMode is set on the TablesProps as
 * BillingMode.PAY_PER_REQUEST and on an individual table, in the
 * TablesProps.tables array, as BillingMode.PROVISIONED, then the function will
 * use node BillingMode.PROVISIONED. See the Usage Example below.
 */
export interface TablesProps extends Omit<TableProps, OmittedTablesProps> {
  /**
   * Array of tablesProps to use for creation of multiple tables.
   */
  tables?: TableProps[];
}
export class Tables extends Construct {
  public resources: { [tableName: string]: Table } = {};
  private globalProps: Omit<TablesProps, 'tables'>;

  constructor(scope: Construct, id: string, props: TablesProps) {
    super(scope, id);
    this.globalProps = mergeProps(props, { tables: undefined });

    for (const table of props.tables ?? []) {
      this.addTable(table);
    }
  }

  public addTable(tableProps: TableProps) {
    const props = mergeProps(this.globalProps, tableProps);
    const table = new Table(this, `${tableProps.name}`, props);
    this.resources[tableProps.name] = table;
    return table;
  }
}
