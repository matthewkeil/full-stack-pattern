import { StackProps, Stack, Construct } from '@aws-cdk/core';
import { Api } from '../../constructs/Api';
import { Tables } from '../../constructs/Tables';
import { Lambdas } from '../../constructs/Lambdas';
import { ServerlessConstruct, ServerlessConstructProps } from './ServerlessConstruct';

export interface ServerlessStackProps
  extends Omit<StackProps, 'description'>,
    ServerlessConstructProps {}

export class ServerlessStack extends Stack {
  public lambdas?: Lambdas;
  public tables?: Tables;
  public api?: Api;
  public domain?: string;

  private construct: ServerlessConstruct;

  constructor(scope: Construct, id: string, props: ServerlessStackProps) {
    super(scope, id, props);
    this.construct = new ServerlessConstruct(this, 'ServerlessConstruct', props);
    const { lambdas, tables, api, domainUrl } = this.construct;
    this.lambdas = lambdas;
    this.tables = tables;
    this.api = api;
    this.domain = domainUrl;
  }
}
