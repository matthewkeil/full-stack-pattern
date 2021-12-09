import { Construct, Stack } from '@aws-cdk/core';
import { CDNNestedStack, CognitoNestedStack, CoreNestedStack, ServerlessNestedStack } from '../..';
import { FullStackConstruct, FullStackProps } from './FullStackConstruct';

export class FullNestedStack extends Stack {
  public core?: CoreNestedStack;
  public cdn?: CDNNestedStack;
  public auth?: CognitoNestedStack;
  public backend?: ServerlessNestedStack;
  public addConfigFile: FullStackConstruct['addConfigFile'];

  private constructor(scope: Construct, id: string, props: FullStackProps) {
    super(scope, id, {
      ...props,
      stackName: props.prefix
    });
    const construct = new FullStackConstruct(this, 'FullStack', {
      ...props,
      nested: true
    });
    const { core, serverless: backend, cognito: auth, cdn, addConfigFile } = construct;
    this.core = core as CoreNestedStack | undefined;
    this.backend = backend as ServerlessNestedStack | undefined;
    this.auth = auth as CognitoNestedStack | undefined;
    this.cdn = cdn as CDNNestedStack | undefined;
    this.addConfigFile = addConfigFile.bind(construct);
  }

  static async create(
    scope: Construct,
    id: string,
    props: FullStackProps & {
      profile?: string;
    }
  ) {
    const _props = await FullStackConstruct.lookupExistingResources(props);
    return new FullNestedStack(scope, id, _props);
  }
}
