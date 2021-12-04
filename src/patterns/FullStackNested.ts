import { Construct, Stack } from '@aws-cdk/core';
import { CDNNestedStack, CognitoNestedStack, CoreNestedStack, ServerlessNestedStack } from '../..';
import { FullStackConstruct, FullStackProps } from './FullStackConstruct';

export class FullStackNested extends Stack {
  public core: CoreNestedStack;
  public frontend: CDNNestedStack;
  public auth: CognitoNestedStack;
  public backend: ServerlessNestedStack;
  public addConfigFile: FullStackConstruct['addConfigFile'];

  constructor(scope: Construct, id: string, props: FullStackProps) {
    super(scope, id, props);
    const construct = new FullStackConstruct(this, 'FullStack', {
      ...props,
      nested: true
    });
    const { core, backend, auth, frontend, addConfigFile } = construct;
    this.core = core as CoreNestedStack;
    this.backend = backend as ServerlessNestedStack;
    this.auth = auth as CognitoNestedStack;
    this.frontend = frontend as CDNNestedStack;
    this.addConfigFile = addConfigFile.bind(construct);
  }

  static async create(
    scope: Construct,
    id: string,
    props: FullStackProps & {
      profile: string;
    }
  ) {
    const _props = await FullStackConstruct.addAccountProps(props);
    return new FullStackNested(scope, id, _props);
  }
}
