import { Construct, Duration, NestedStack, NestedStackProps } from '@aws-cdk/core';
import { IRole } from '@aws-cdk/aws-iam';
import {
  CfnIdentityPool,
  CfnUserPoolDomain,
  IUserPool,
  IUserPoolClient
} from '@aws-cdk/aws-cognito';
import { CognitoConstruct, CognitoConstructProps } from './CognitoConstruct';

export interface CognitoNestedStackProps
  extends Omit<NestedStackProps, 'removalPolicy' | 'timeout'>,
    CognitoConstructProps {
  stackTimeout?: Duration;
}

export class CognitoNestedStack extends NestedStack {
  public userPool: IUserPool;
  public userPoolClient: IUserPoolClient;
  public userPoolDomain?: CfnUserPoolDomain;
  public identityPool?: CfnIdentityPool;
  public authenticatedRole?: IRole;
  public groups: CognitoConstruct['groups'];

  constructor(scope: Construct, id: string, props: CognitoNestedStackProps) {
    super(scope, id, {
      ...props,
      removalPolicy: undefined,
      timeout: props.stackTimeout
    });
    const {
      userPool,
      userPoolClient,
      userPoolDomain,
      identityPool,
      authenticatedRole,
      groups
    } = new CognitoConstruct(this, 'CognitoConstruct', props);
    this.userPool = userPool;
    this.userPoolClient = userPoolClient;
    this.userPoolDomain = userPoolDomain;
    this.identityPool = identityPool;
    this.authenticatedRole = authenticatedRole;
    this.groups = groups;
  }
}
