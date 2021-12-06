import { StackProps, Stack, Construct } from '@aws-cdk/core';
import { Api } from '../../constructs/Api';
import { Tables } from '../../constructs/Tables';
import { Lambdas } from '../../constructs/Lambdas';
import {
  AddConfigFileProps,
  ServerlessConstruct,
  ServerlessConstructProps
} from './ServerlessConstruct';

export interface ServerlessStackProps
  extends Omit<StackProps, 'description'>,
    ServerlessConstructProps {}

export class ServerlessStack extends Stack {
  public lambdas?: Lambdas;
  public tables?: Tables;
  public api?: Api;

  private construct: ServerlessConstruct;

  constructor(scope: Construct, id: string, props: ServerlessStackProps) {
    super(scope, id, {
      ...props,
      stackName: props.stackName ?? `${props.prefix}-serverless`
    });
    this.construct = new ServerlessConstruct(this, 'ServerlessConstruct', props);
    const { lambdas, tables, api } = this.construct;
    this.lambdas = lambdas;
    this.tables = tables;
    this.api = api;
  }

  public addConfigFile(configProps: AddConfigFileProps) {
    this.construct.addConfigFile(configProps);
  }
}
