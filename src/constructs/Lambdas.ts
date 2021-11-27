import { AssetCode, Code, Runtime } from '@aws-cdk/aws-lambda';
import { Construct, Duration } from '@aws-cdk/core';

import { mergeProps, toPascal } from '../../lib';
import { Lambda, LambdaProps } from './Lambda';
import { Tables } from './Tables';
import { Api } from './Api';

const DEFAULT_PROPS = {
  runtime: Runtime.NODEJS_14_X,
  timeout: Duration.seconds(10),
  loggingLevel: 'INFO'
} as LambdasProps;

export interface LambdasProps
  extends Partial<Omit<LambdaProps, 'name' | 'description' | 'handler'>> {
  lambdas?: LambdaProps[];
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

  public addLambda(props: LambdaProps) {
    const _props = mergeProps(this.globalProps, props);
    const lambda = new Lambda(this, toPascal(props.name), _props);
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
