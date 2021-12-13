import { nanoid } from 'nanoid';
import { CfnOutput, Construct, Fn, RemovalPolicy, Stack } from '@aws-cdk/core';
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

import { Mutable } from '../../../lib/Mutable';
import { buildUrls } from '../../../lib/buildUrls';
import { toKebab, toPascal } from '../../../lib/changeCase';

interface GroupConfig {
  /**
   * The name of the group
   */
  groupName: string;

  /**
   * LogicalId for the RestApi resource for in-place upgrades. For more
   * info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   */
  logicalId?: string;

  /**
   * Prevents IAM from being created
   */
  noIam?: boolean;

  /**
   * Can pass in a IRole or role arn to use for the group Role
   */
  role?: IRole | string;

  /**
   * PolicyStatements to add to the group role
   */
  policyStatements?: PolicyStatement[];

  /**
   * For each userEmail, will add a user to the UserPool and attach the user
   * to the group
   */
  userEmails?: string[];
}

type IdentityPoolConfig = CfnIdentityPoolProps & { removalPolicy?: RemovalPolicy };

interface WithLogicalId {
  logicalId?: string;
}

interface UserPoolDomainProps extends WithLogicalId {
  /**
   * The root domain to use for the UserPoolDomain
   * @example 'example.com'
   */
  baseDomain?: string;

  /**
   * The subDomain to user for the UserPoolDomain. Does one of two things.
   *
   * 1) When not using a customDomain this is the prefix for the url that
   * gets assigned by cognito.  Usually in the format of:
   * `https://${subDomain}.auth.${region}.amazoncognito.com`
   *
   * 2) Optionally, when using a custom rootDomain, this is the subDomain
   * that you want to host the login page at. default is 'auth'
   * ex. `auth.example.com` and `dev.auth.example.com`
   */
  subDomain?: string;

  /**
   * The stage of the website that is being hosted. ex. Using `qa` as the
   * stage will host the site at the sub-domain `qa.example.com`.  This also
   * applies to the login page that is hosted by cognito when using your
   * own domain.  Auth will be hosted at `auth.example.com` for prod and
   * `qa.auth.example.com` for qa.
   *
   * @default 'prod'
   */
  stage?: string;

  /**
   * ACM Certificate to use for the UserPoolDomain TLS/SSL
   */
  certificateArn?: string;
}

export interface CognitoConstructProps {
  /**
   * The prefix to use with resource names. If `prefix` and `name` are
   * provided then the apiName will be `${prefix}-${name}`.  If no name
   * is provided then the apiName will be `prefix`. For more info, see
   * [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   */
  prefix?: string;

  /**
   * Option to not use fixed logicalId's for the RestApi resource. For more
   * info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   */
  dontOverrideLogicalId?: boolean;

  /**
   * Will reuse an existing UserPool by passing in the `userPoolId`.  Will
   * ignore the `userPool` prop when using an existing UserPool
   */
  userPoolId?: string;

  /**
   * Full configuration of the UserPool that will be created in addition
   * to having control over the logicalId
   */
  userPool?: UserPoolProps & WithLogicalId;

  /**
   * Will reuse an existing UserPoolClient by passing in the `userPoolClientId`
   * Will ignore the `userPoolClient` prop when using an existing UserPoolClient
   */
  userPoolClientId?: string;

  /**
   * Full configuration of the UserPoolClient that will be created in addition
   * to having control over the logicalId
   */
  userPoolClient?: Omit<UserPoolClientProps, 'userPool'> & WithLogicalId;

  /**
   * Full configuration of the UserPoolDomain that will be created
   */
  userPoolDomain?: UserPoolDomainProps;

  /**
   * Full configuration of the IdentityPool that will be created in addition
   * to having control over the logicalId
   */
  identityPool?: IdentityPoolConfig & WithLogicalId;

  /**
   * Takes an IRole or an arn instead of building an AuthenticatedRole when
   * an IdentityPool is created.  If IdentityPool is not created, this will
   * trigger the creation of one and associate this role
   */
  authenticatedRole?: IRole | string;

  /**
   * PolicyStatements to attach when building an AuthenticatedRole. If an
   * authenticatedRole is not provided, one will be created.  If the
   * IdentityPool is not created, this will trigger the creation of one and
   * associate the authenticatedRole
   */
  authenticatedPolicyStatements?: PolicyStatement[];

  /**
   * Create groups for the user pool and, optionally, the identity pool
   */
  groups?: GroupConfig[];

  /**
   * Will provision the users in the UserPool.  Sets userEmail as the username
   * and optionally attaches the user to any number of groups
   */
  users?: { userEmail: string; groupNames: string[] }[];

  /**
   * CSS string to be used for the user pool UI customization.
   * For more info see [Cognito UI Customizations](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpooluicustomizationattachment.html#cfn-cognito-userpooluicustomizationattachment-css)
   */
  css?: string;

  /**
   * RemovalPolicy to apply to all resources.  If a RemovalPolicy prop is provided
   * for a specific resource, ie the `props.userPool.removalPolicy`, it will
   * override this value
   */
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
        this.addGroup(group);
      }
    }

    if (this.props.users) {
      for (const { userEmail, groupNames } of this.props.users) {
        this.addUser({ userEmail, groupNames });
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
    if (!userPoolName) {
      throw new Error('must provide either a userPoolName or prefix');
    }
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
      (this.userPool.node.defaultChild as CfnUserPool).overrideLogicalId(
        this.props.userPool?.logicalId ? this.props.userPool.logicalId : 'UserPool'
      );
    }
    new CfnOutput(this, 'UserPoolId', {
      value: this.userPool.userPoolId
    });

    const userPoolClientName = this.props.userPoolClient?.userPoolClientName ?? this.props.prefix;
    if (!userPoolClientName) {
      throw new Error('must provide either a userPoolClientName or prefix');
    }
    this.userPoolClient = this.props.userPoolClientId
      ? UserPoolClient.fromUserPoolClientId(this, 'UserPoolClient', this.props.userPoolClientId)
      : new UserPoolClient(this, 'UserPoolClient', {
          generateSecret: false,
          supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
          ...(this.props.userPoolClient ?? {}),
          userPoolClientName,
          userPool: this.userPool
        });
    if (this.props.dontOverrideLogicalId !== true) {
      (this.userPoolClient.node.defaultChild as CfnUserPoolClient).overrideLogicalId(
        this.props.userPoolClient?.logicalId
          ? this.props.userPoolClient.logicalId
          : 'UserPoolClient'
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
      if (this.props.userPoolDomain?.baseDomain) {
        [domain] = buildUrls({
          baseDomain: this.props.userPoolDomain?.baseDomain,
          subDomain: this.props.userPoolDomain?.subDomain ?? 'auth',
          stage: this.props.userPoolDomain?.stage
        });
      } else {
        if (!this.props.userPoolDomain?.subDomain) {
          throw new Error(
            'must provide a userPoolDomain.subDomain, userPoolDomain.rootDomain or both when building a user pool'
          );
        }
        domain = this.props.userPoolDomain.subDomain;
      }

      const domainProps: Mutable<CfnUserPoolDomainProps> = {
        userPoolId: this.userPool.userPoolId,
        domain
      };
      if (this.props.userPoolDomain?.certificateArn) {
        domainProps.customDomainConfig = {
          certificateArn: this.props.userPoolDomain.certificateArn
        };
      }

      this.userPoolDomain = new CfnUserPoolDomain(this, 'UserPoolDomain', domainProps);
      this.userPoolDomain.applyRemovalPolicy(this.props.removalPolicy ?? RemovalPolicy.DESTROY);
      if (this.props.dontOverrideLogicalId !== true) {
        this.userPoolDomain.overrideLogicalId(
          this.props.userPoolDomain?.logicalId
            ? this.props.userPoolDomain.logicalId
            : 'UserPoolDomain'
        );
      }
      new CfnOutput(this, 'UserPoolDomainUrl', {
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
      throw new Error('must provide a name for roles');
    }
    const roleName = this.props.prefix
      ? `${this.props.prefix}-${toKebab(name)}`
      : `${toKebab(name)}${nanoid()}`;
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
    const identityPoolName = this.props.identityPool?.identityPoolName ?? this.props.prefix;
    if (!identityPoolName) {
      throw new Error('must provide either a identityPoolName or prefix');
    }
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
      identityPoolName
    });
    this.identityPool.applyRemovalPolicy(
      this.props.identityPool?.removalPolicy ?? this.props.removalPolicy ?? RemovalPolicy.DESTROY
    );

    if (this.props.dontOverrideLogicalId !== true) {
      this.identityPool.overrideLogicalId(
        this.props.identityPool?.logicalId ? this.props.identityPool.logicalId : 'IdentityPool'
      );
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

  private addUserToGroup({ group, user }: { group: CfnUserPoolGroup; user: CfnUserPoolUser }) {
    const groupAttachment = new CfnUserPoolUserToGroupAttachment(
      this,
      toPascal(`${group.groupName}UserAttachment${nanoid()}`),
      {
        userPoolId: this.userPool.userPoolId,
        groupName: group.groupName as string,
        username: user.username as string
      }
    );
    groupAttachment.addDependsOn(group);
    groupAttachment.addDependsOn(user);
  }

  public addUser({ userEmail, groupNames }: { userEmail: string; groupNames?: string[] }) {
    const user = new CfnUserPoolUser(this, `User${nanoid()}`, {
      userPoolId: this.userPool.userPoolId,
      username: userEmail,
      desiredDeliveryMediums: ['EMAIL'],
      userAttributes: [
        { name: 'email', value: userEmail },
        { name: 'email_verified', value: 'true' }
      ]
    });
    user.applyRemovalPolicy(this.props.removalPolicy ?? RemovalPolicy.DESTROY);

    if (this.groups) {
      for (const groupName of groupNames ?? []) {
        const group = this.groups[groupName];
        if (!group) {
          throw new Error(`group ${groupName} does not exist`);
        }
        this.addUserToGroup({ user, group: group.group });
      }
    }

    return user;
  }

  public addGroup({
    groupName,
    logicalId,
    policyStatements,
    role,
    noIam,
    userEmails
  }: GroupConfig) {
    const _role = noIam
      ? undefined
      : this.buildRole({
          role,
          policyStatements,
          name: `${groupName}-group`
        });
    const groupLogicalId = logicalId ? logicalId : `${toPascal(groupName)}Group`;

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

    if (!this.groups) {
      this.groups = {};
    }
    this.groups[groupName] = { group, role: _role };

    for (const userEmail of userEmails ?? []) {
      this.addUser({ userEmail, groupNames: [groupName] });
    }
  }
}
