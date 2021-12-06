---
sidebar_position: 5
---

# Tables

This construct is meant as a helper class to create many tables that have shared properties. Any props passed to both the Tables construct and to the individual tables, created using this construct, will have the props merged.

Example: By default the individual props will get merged in with the ones set for the group and anything specifically set on one table will supercede the group values. Ie, if billingMode is set on the TablesProps as BillingMode.PAY_PER_REQUEST and on an individual table, in the TablesProps.tables array, as BillingMode.PROVISIONED, then the function will use node BillingMode.PROVISIONED. See the Usage Example below.

## TablesProps

```typescript
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
```

## Usage Example

```typescript
const prefix = `${client}-${project}-${stage}`;

const tables = new Tables(this, 'Tables', {
  prefix
  billingMode: BillingMode.PAY_PER_REQUEST,
  removalPolicy: RemovalPolicy.RETAIN,
  tables: [
    {
      name: 'fancy-table',
      partitionKey: {
        id: 'string'
      }
    }
  ]
});

/**
 * all tables created with this construct will have the group props merged
 * with the individual table props.  ie this table will have billingMode
 * set to BillingMode.PAY_PER_REQUEST and removalPolicy set to
 * RemovalPolicy.RETAIN,
 */
tables.addTable({
  name: 'super-fancy-table',
  partitionKey: {
    specialId: 'number'
  }
});

const lambdas = new Lambdas(this, 'Lambdas', {
  prefix,
  tables, // can pass in the tables into the Lambda and Lambdas construct
  lambdas: [{
    /**
     * when used with the Tables construct the table prop can be a string
     * and it will be interpreted as the name of the table to associate
     * with the function.  See the Lambda construct for more details.
     */
    table: 'fancy-table',
    ...functionProps
  }]
});
```
