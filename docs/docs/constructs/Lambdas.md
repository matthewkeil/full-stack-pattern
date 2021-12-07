---
sidebar_position: 3
---

# Lambdas

This construct is meant as a helper class to create many lambdas that have shared properties. Any props passed to both the Lambdas construct and to the individual lambda created using this construct will have the props merged.

Example: By default the individual props will get merged in with the ones set for the group and anything specifically set on one lambda will supercede the group values. Ie, if runtime is set on the LambdasProps as Runtime.NODEJS_14_X and on an individual lambda, in the LambdasProps.lambdas array, as Runtime.NODEJS_10_X, then the function will use node 10.X. See the Usage Example below.

## LambdasProps

**NOTE** Every option available in the singular LambdaProps is also available in the plural LambdasProps. See the singular LambdasProps for more information.

```typescript
type LambdasPropsOptionalRuntimeAndCode = Omit<LambdaProps, 'runtime' | 'code'> & {
  code?: Code;
  runtime?: Runtime;
};

/**
 * Any prop that can be set on an individual lambda can be set on this
 * construct and all lambdas made in this group will have those values. Only
 * the props 'name', 'description' and 'handler' cannot be set as a group as
 * thats not possible.
 *
 * 'runtime' and 'code' are Omitted as they are allowed as optional props but
 * required by the Lambda construct.  See information below for each of those
 *
 * By default the individual props will get merged in with the ones set for
 * the group and anything specifically set on one lambda will supercede the
 * group values.  ie if runtime is set on the LambdasProps as
 * Runtime.NODEJS_14_X and on an individual lambda, in the LambdasProps.lambdas
 * array, as Runtime.NODEJS_10_X, then the function will use node 10.X
 *
 */
export interface LambdasProps
  extends Partial<Omit<LambdaProps, 'name' | 'description' | 'handler' | 'runtime' | 'code'>> {
  /**
   * An array of LambdaProps objects where the `runtime` and `code` are optional
   * While technically required they can be optionally passed as shared props and
   * that will get merged with each set of individual props and creation time.
   */
  lambdas?: LambdasPropsOptionalRuntimeAndCode[];

  /**
   * Runtime to use with all lambdas in this group.
   */
  runtime?: Runtime;

  /**
   * Code to use with all lambdas in this group.  Can pass a string to the
   * absolute path of the code folder and the AssetCode will be created for
   * you.  You can also pass in any Construct that extends Code ie:
   * InlineCode, AssetCode, S3Code, etc.
   */
  code?: Code | string;

  /**
   * Can pass a Tables object to the Lambdas object.  That was you can use
   * LambdaProps.table as a string to reference the table that should be
   * associated.  Makes building the lambdas array easier.
   */
  tables?: Tables;
}
```

## Usage Example

```typescript
const tables = new Tables(this, 'Tables', {
  tables: [
    {
      name: 'table-1'
      /* see Table docs for props */
    }
  ]
});

const lambdas = new Lambdas(this, 'Lambdas', {
  tables,
  // default runtime
  runtime: Runtime.NODEJS_14_X,
  // this code bundle will be used for all lambdas
  code: path.resolve(__dirname, '..', 'src', 'lambdas'),
  loggingLevel: 'INFO',
  environment: {
    SOME_ENV_VAR: 'some-important-value'
  },
  lambdas: [
    {
      name: 'function-1',
      handler: 'function1/index.handler',
      // can override any default value set on the Lambdas construct
      // this function will use node 10.X instead of 14.X
      runtime: Runtime.NODEJS_10_X
    },
    {
      name: 'function-2',
      handler: 'function2/index.handler',
      // merges group env with individual env.
      // this function will have both SOME_ENV_VAR and ANOTHER_ENV_VAR
      environment: {
        ANOTHER_ENV_VAR: 'another-important-value'
      }
    },
    {
      name: 'function-3',
      handler: 'function3/index.handler',
      // adds association to table-1. see lambda.associateTable for more info
      table: 'table-1',
    }
  ]
});

// added function will use any defaults set on the Lambdas construct
lambdas.addLambda({
  name: 'function-4',
  handler: 'function4/index.handler'
});
```
