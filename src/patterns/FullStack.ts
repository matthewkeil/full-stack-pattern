import { Construct } from '@aws-cdk/core';
import { FullStackConstruct, FullStackProps } from './FullStackConstruct';

export class FullStack extends FullStackConstruct {
  constructor(scope: Construct, id: string, props: Omit<FullStackProps, 'nested'>) {
    super(scope, id, {
      ...props,
      nested: false
    });
  }

  static async create(
    scope: Construct,
    id: string,
    props: FullStackProps & {
      profile: string;
    }
  ) {
    const _props = await FullStackConstruct.addAccountProps(props);
    return new FullStack(scope, id, _props);
  }
}
