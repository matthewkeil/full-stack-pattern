import { NestedStack, Construct, NestedStackProps, Duration } from '@aws-cdk/core';
import { Api } from '../../constructs/Api';
import { Lambdas } from '../../constructs/Lambdas';
import { Tables } from '../../constructs/Tables';
import { ServerlessConstruct, ServerlessConstructProps } from './ServerlessConstruct';

export interface ServerlessNestedStackProps
  extends Omit<NestedStackProps, 'removalPolicy' | 'timeout' | 'parameters'>,
    ServerlessConstructProps {
  stackTimeout?: Duration;
}

export class ServerlessNestedStack extends NestedStack {
  public lambdas?: Lambdas;
  public tables?: Tables;
  public api?: Api;
  public domain?: string;

  private construct: ServerlessConstruct;

  constructor(scope: Construct, id: string, props: ServerlessNestedStackProps) {
    super(scope, id, {
      ...props,
      removalPolicy: undefined,
      parameters: undefined,
      timeout: props.stackTimeout
    });
    this.construct = new ServerlessConstruct(this, 'ServerlessConstruct', props);
    const { lambdas, tables, api, domainUrl } = this.construct;
    this.lambdas = lambdas;
    this.tables = tables;
    this.api = api;
    this.domain = domainUrl;
  }
}
