import { NestedStack, Construct, NestedStackProps, Duration } from '@aws-cdk/core';
import { Api } from '../../constructs/Api';
import { Lambdas } from '../../constructs/Lambdas';
import { Tables } from '../../constructs/Tables';
import { ServerlessConstruct, ServerlessConstructProps } from './ServerlessConstruct';

export interface ServerlessNestedStackProps
  extends Omit<NestedStackProps, 'removalPolicy' | 'timeout'>,
    ServerlessConstructProps {
  stackTimeout?: Duration;
}

export class ServerlessNestedStack extends NestedStack {
  public lambdas?: Lambdas;
  public tables?: Tables;
  public api?: Api;

  constructor(scope: Construct, id: string, props: ServerlessNestedStackProps) {
    super(scope, id, {
      ...props,
      timeout: props.stackTimeout,
    });
    const { lambdas, tables, api } = new ServerlessConstruct(this, 'ServerlessConstruct', props);
    this.lambdas = lambdas;
    this.tables = tables;
    this.api = api;
  }
}
