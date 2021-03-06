import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { IRole } from '@aws-cdk/aws-iam';
import {
  CfnIdentityPool,
  CfnUserPoolDomain,
  IUserPool,
  IUserPoolClient
} from '@aws-cdk/aws-cognito';
import { CognitoConstruct, CognitoConstructProps } from './CognitoConstruct';

export interface CognitoStackProps extends StackProps, CognitoConstructProps {}

export class CognitoStack extends Stack {
  public userPool: IUserPool;
  public userPoolClient: IUserPoolClient;
  public userPoolDomain?: CfnUserPoolDomain;
  public identityPool?: CfnIdentityPool;
  public authenticatedRole?: IRole;
  public groups: CognitoConstruct['groups'];

  constructor(scope: Construct, id: string, props: CognitoStackProps) {
    super(scope, id, props);
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
