import { Construct, Stack } from '@aws-cdk/core';
import { CoreNestedStack } from '../stacks/core/CoreNestedStack';
import { CDNNestedStack } from '../stacks/cdn/CDNNestedStack';
import { CognitoNestedStack } from '../stacks/cognito/CognitoNestedStack';
import { ServerlessNestedStack } from '../stacks/serverless/ServerlessNestedStack';
import { FullStackProps } from './FullStackProps';
import { FullStackConstruct } from './FullStackConstruct';

export class FullNestedStack extends Stack {
  public core?: CoreNestedStack;
  public cdn?: CDNNestedStack;
  public cognito?: CognitoNestedStack;
  public serverless?: ServerlessNestedStack;
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
    this.core = construct.core as CoreNestedStack | undefined;
    this.cdn = construct.cdn as CDNNestedStack | undefined;
    this.cognito = construct.cognito as CognitoNestedStack | undefined;
    this.serverless = construct.serverless as ServerlessNestedStack | undefined;
    this.addConfigFile = construct.addConfigFile.bind(construct);
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
