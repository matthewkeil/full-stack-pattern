import { AssetCode, Code, Runtime } from '@aws-cdk/aws-lambda';
import { Construct, Duration } from '@aws-cdk/core';

import { mergeProps } from '../../lib/mergeProps';
import { toPascal } from '../../lib/changeCase';
import { Lambda, LambdaProps } from './Lambda';
import { Tables } from './Tables';
import { Api } from './Api';

const DEFAULT_PROPS = {
  runtime: Runtime.NODEJS_14_X,
  timeout: Duration.seconds(10),
  loggingLevel: 'INFO'
} as LambdasProps;

export type LambdasPropsOptionalRuntimeAndCode = Omit<LambdaProps, 'runtime' | 'code'> & {
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

export class Lambdas extends Construct {
  public resources: { [name: string]: Lambda } = {};
  public api?: Api;

  private globalProps: Omit<LambdasProps, 'lambdas' | 'code'> & { code?: Code };

  constructor(scope: Construct, id: string, props: LambdasProps) {
    super(scope, id);
    this.globalProps = mergeProps(
      DEFAULT_PROPS,
      props,
      { lambdas: undefined },
      { code: typeof props.code === 'string' ? new AssetCode(props.code) : props.code }
    );

    for (const lambdaProps of props.lambdas ?? []) {
      this.addLambda(lambdaProps);
    }
  }

  public addLambda(props: LambdasPropsOptionalRuntimeAndCode) {
    const _props = mergeProps(this.globalProps, props);
    const { runtime, code } = _props;
    if (!runtime) {
      throw new Error('Must provide runtime');
    }
    if (!code) {
      throw new Error('Must provide either code directory or Code for Lambda');
    }
    const lambda = new Lambda(this, toPascal(props.name), { ..._props, runtime, code });
    this.resources[props.name] = lambda;

    if (lambda.api) {
      if (this.api && this.api !== lambda.api) {
        throw new Error(
          'Attempting to use more than one Api for Lambdas. create a separate construct if that is your intention'
        );
      }
      this.api = lambda.api;
    }

    return lambda;
  }
}
