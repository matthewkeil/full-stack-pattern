import { CfnOutput, Construct, Fn, IResolvable, RemovalPolicy, Stack } from '@aws-cdk/core';
import {
  Role,
  IRole,
  FederatedPrincipal,
  RoleProps,
  PolicyDocument,
  PolicyStatement
} from '@aws-cdk/aws-iam';
import {
  UserPool,
  UserPoolClient,
  CfnIdentityPool,
  CfnIdentityPoolRoleAttachment,
  CfnUserPoolDomain,
  CfnUserPoolGroup,
  UserPoolClientIdentityProvider,
  CfnUserPoolUICustomizationAttachment,
  CfnIdentityPoolProps,
  UserPoolProps,
  UserPoolClientProps,
  IUserPool,
  CfnUserPool,
  CfnUserPoolClient,
  IUserPoolClient,
  CfnUserPoolDomainProps,
  CfnUserPoolUser,
  CfnUserPoolUserToGroupAttachment
} from '@aws-cdk/aws-cognito';
import { toKebab, toPascal, Mutable } from '../../../lib';
import { Group } from 'aws-sdk/clients/budgets';

interface GroupConfig {
  groupName: string;
  noRole?: boolean;
  role?: IRole | string;
  policyStatements?: PolicyStatement[];
  userEmail?: string;
}
type IdentityPoolConfig = CfnIdentityPoolProps & { removalPolicy?: RemovalPolicy };

export interface CognitoConstructProps {
  prefix: string;
  dontOverrideLogicalId?: boolean;
  /**
   *
   */
  userPoolId?: string;
  userPool?: UserPoolProps;
  userPoolClientId?: string;
  userPoolClient?: Omit<UserPoolClientProps, 'userPool'>;
  rootDomain?: string;
  subDomain?: string;
  certificateArn?: string;
  /**
   *
   */
  identityPool?: IdentityPoolConfig;
  authenticatedRole?: IRole | string;
  authenticatedPolicyStatements?: PolicyStatement[];
  /**
   * @description Create groups for the user pool and, optionally, the identity pool
   */
  groups?: GroupConfig[];

  css?: string;

  removalPolicy?: RemovalPolicy;
}

export class CognitoConstruct extends Construct {
  public userPool!: IUserPool;
  public userPoolClient!: IUserPoolClient;
  public userPoolDomain?: CfnUserPoolDomain;
  public identityPool?: CfnIdentityPool;
  public authenticatedRole?: IRole;
  public groups?: { [groupName: string]: { group: CfnUserPoolGroup; role?: IRole } };

  constructor(scope: Construct, id: string, private props: CognitoConstructProps) {
    super(scope, id);
    this.buildUserPool();

    if (
      this.props.identityPool ||
      this.props.authenticatedRole ||
      this.props.authenticatedPolicyStatements
    ) {
      this.buildIdentityPool();
    }

    if (this.props.groups) {
      for (const group of this.props.groups) {
        this.buildGroup(group);
      }
    }

    if (props.css) {
      new CfnUserPoolUICustomizationAttachment(this, 'CognitoUICustomization', {
        userPoolId: this.userPool.userPoolId,
        clientId: this.userPoolClient.userPoolClientId,
        css: props.css
      });
    }
  }

  private buildUserPool() {
    const userPoolName = this.props.userPool?.userPoolName ?? this.props.prefix;
    this.userPool = this.props.userPoolId
      ? UserPool.fromUserPoolId(this, 'UserPool', this.props.userPoolId)
      : new UserPool(this, 'UserPool', {
          userInvitation: {
            emailSubject: `Your temporary password for ${userPoolName}`,
            emailBody: 'Your username is {username} and temporary password is {####}.'
          },
          autoVerify: {
            email: true
          },
          selfSignUpEnabled: false,
          standardAttributes: {
            email: {
              required: true
            }
          },
          ...(this.props.userPool ?? {}),
          userPoolName,
          removalPolicy:
            this.props.userPool?.removalPolicy ?? this.props.removalPolicy ?? RemovalPolicy.DESTROY
        });
    if (this.props.dontOverrideLogicalId !== true) {
      (this.userPool.node.defaultChild as CfnUserPool).overrideLogicalId('UserPool');
    }
    new CfnOutput(this, 'UserPoolId', {
      value: this.userPool.userPoolId
    });

    this.userPoolClient = this.props.userPoolClientId
      ? UserPoolClient.fromUserPoolClientId(this, 'UserPoolClient', this.props.userPoolClientId)
      : new UserPoolClient(this, 'UserPoolClient', {
          generateSecret: false,
          supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
          ...(this.props.userPoolClient ?? {}),
          userPoolClientName: this.props.userPoolClient?.userPoolClientName ?? this.props.prefix,
          userPool: this.userPool
        });
    if (this.props.dontOverrideLogicalId !== true) {
      (this.userPoolClient.node.defaultChild as CfnUserPoolClient).overrideLogicalId(
        'UserPoolClient'
      );
    }
    if (this.userPoolClient instanceof UserPoolClient) {
      this.userPoolClient.applyRemovalPolicy(this.props.removalPolicy ?? RemovalPolicy.DESTROY);
    }
    new CfnOutput(this, 'UserPoolClientId', {
      value: this.userPoolClient.userPoolClientId
    });

    if (this.userPool instanceof UserPool) {
      let domain: string;
      if (this.props.rootDomain) {
        domain = this.props.subDomain
          ? `${this.props.subDomain}.${this.props.rootDomain}`
          : `auth.${this.props.rootDomain}`;
      } else {
        if (!this.props.subDomain) {
          throw new Error('must provide a subDomain when not using a custom rootDomain');
        }
        domain = this.props.subDomain;
      }

      const domainProps: Mutable<CfnUserPoolDomainProps> = {
        userPoolId: this.userPool.userPoolId,
        domain
      };
      if (this.props.certificateArn) {
        domainProps.customDomainConfig = { certificateArn: this.props.certificateArn };
      }

      this.userPoolDomain = new CfnUserPoolDomain(this, 'UserPoolDomain', domainProps);
      this.userPoolDomain.applyRemovalPolicy(this.props.removalPolicy ?? RemovalPolicy.DESTROY);
      if (this.props.dontOverrideLogicalId !== true) {
        this.userPoolDomain.overrideLogicalId('UserPoolDomain');
      }
      new CfnOutput(this, 'UserPoolDomain', {
        value: this.userPoolDomain.domain
      });
    }
  }

  private buildRole({
    name,
    role,
    policyStatements
  }: {
    name?: string;
    role?: IRole | string;
    policyStatements?: PolicyStatement[];
  }): IRole {
    function arnToName(arn: string) {
      return arn.split('/')[1];
    }

    if (!this.identityPool) {
      this.buildIdentityPool();
    }

    if (role) {
      return typeof role === 'string'
        ? Role.fromRoleArn(this, `${toPascal(arnToName(role))}Role`, role, { mutable: false })
        : role;
    }

    if (!name) {
      throw new Error('must provide a name for the role');
    }
    const roleName = `${this.props.prefix}-${toKebab(name)}`;
    const roleProps: Mutable<RoleProps> = {
      roleName: roleName.substr(0, 63),
      assumedBy: new FederatedPrincipal(
        'cognito-identity.amazonaws.com',
        {
          StringEquals: {
            'cognito-identity.amazonaws.com:aud': this.identityPool?.ref
          },
          'ForAnyValue:StringLike': {
            'cognito-identity.amazonaws.com:amr': 'authenticated'
          }
        },
        'sts:AssumeRoleWithWebIdentity'
      )
    };
    if (policyStatements?.length) {
      roleProps.inlinePolicies = {
        [roleName]: new PolicyDocument({
          statements: policyStatements
        })
      };
    }

    return new Role(this, `${toPascal(roleName)}Role`, roleProps);
  }

  private buildIdentityPool() {
    this.identityPool = new CfnIdentityPool(this, 'IdentityPool', {
      allowUnauthenticatedIdentities: false,
      cognitoIdentityProviders: [
        {
          serverSideTokenCheck: false,
          clientId: this.userPoolClient.userPoolClientId,
          providerName:
            this.userPool instanceof UserPool
              ? this.userPool.userPoolProviderName
              : Fn.join('', [
                  'cognito-idp.',
                  Stack.of(this).region,
                  '.amazonaws.com/',
                  this.userPool.userPoolId
                ])
        }
      ],
      ...(this.props.identityPool ?? {}),
      identityPoolName: this.props.identityPool?.identityPoolName ?? this.props.prefix
    });
    this.identityPool.applyRemovalPolicy(
      this.props.identityPool?.removalPolicy ?? this.props.removalPolicy ?? RemovalPolicy.DESTROY
    );

    if (this.props.dontOverrideLogicalId !== true) {
      this.identityPool.overrideLogicalId('IdentityPool');
    }
    new CfnOutput(this, 'IdentityPoolId', {
      value: this.identityPool.ref
    });

    if (!this.authenticatedRole) {
      this.authenticatedRole = this.buildRole({
        name: 'authenticated',
        role: this.props.authenticatedRole,
        policyStatements: this.props.authenticatedPolicyStatements
      });
    }

    new CfnIdentityPoolRoleAttachment(this, 'AuthorizedUserRoleAttachment', {
      identityPoolId: this.identityPool.ref,
      roles: {
        authenticated: this.authenticatedRole.roleArn
      },
      roleMappings: {
        cognitoProvider: {
          identityProvider: Fn.join('', [
            'cognito-idp.',
            Stack.of(this).region,
            '.amazonaws.com/',
            this.userPool.userPoolId,
            ':',
            this.userPoolClient.userPoolClientId
          ]),
          type: 'Token',
          ambiguousRoleResolution: 'AuthenticatedRole'
        }
      }
    });
  }

  private buildGroup({ groupName, policyStatements, role, noRole, userEmail }: GroupConfig) {
    const _role = noRole
      ? undefined
      : this.buildRole({
          role,
          policyStatements,
          name: `${this.props.prefix}-${groupName}-group`
        });
    const groupLogicalId = `${toPascal(groupName)}Group`;
    const group = new CfnUserPoolGroup(this, groupLogicalId, {
      groupName,
      precedence: 0,
      userPoolId: this.userPool.userPoolId,
      roleArn: _role?.roleArn
    });
    group.applyRemovalPolicy(this.props.removalPolicy ?? RemovalPolicy.DESTROY);
    if (this.props.dontOverrideLogicalId !== true) {
      group.overrideLogicalId(groupLogicalId);
    }

    if (userEmail) {
      const userLogicalId = `${toPascal(groupName)}User`;
      const user = new CfnUserPoolUser(this, userLogicalId, {
        userPoolId: this.userPool.userPoolId,
        username: userEmail,
        desiredDeliveryMediums: ['EMAIL'],
        userAttributes: [
          { name: 'email', value: userEmail },
          { name: 'email_verified', value: 'true' }
        ]
      });
      if (this.props.dontOverrideLogicalId !== true) {
        user.overrideLogicalId(userLogicalId);
      }
      user.applyRemovalPolicy(this.props.removalPolicy ?? RemovalPolicy.DESTROY);

      const attachmentLogicalId = `${toPascal(groupName)}UserAttachment`;
      const groupAttachment = new CfnUserPoolUserToGroupAttachment(this, attachmentLogicalId, {
        groupName,
        userPoolId: this.userPool.userPoolId,
        username: userEmail
      });
      if (this.props.dontOverrideLogicalId !== true) {
        groupAttachment.overrideLogicalId(attachmentLogicalId);
      }
      groupAttachment.addDependsOn(group);
      groupAttachment.addDependsOn(user);
    }

    if (!this.groups) {
      this.groups = {};
    }
    this.groups[groupName] = { group, role: _role };
  }
}
