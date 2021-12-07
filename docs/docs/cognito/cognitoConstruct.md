---
sidebar_position: 1
---

# CognitoConstruct

Cognito is a service that is not for the feint at heart. It can take a bit to master but this Construct has you covered. It does a lot of the heavy lifting of when to use/not use an IdentityPool for instance.

All resources are deployed with sensible defaults, however they are all fully configurable from the props object. Can be setup to work with custom domain names. Has the ability to plug into an existing UserPool to share users. Can even share a UserPoolClient (not the best practice btw...)

Enterprise ready. Supports all of the major Cognito Resources and is sensitive to those in production environments that need to preserve logicalId's or physicalId's for in-place resource updates. Can be configured to not create any IAM resources for strictly controlled accounts. Its also battled hardened from use with many, many clients.

Can easily build groups, with or without an associated role. Flexibility to build, nor not build, an AuthenticatedRole. Construct will sense if roles are built and automatically provision the IdentityPool if so.

Easily provision users and adds them to groups.

#### Resource types that are deployed

- AWS::Cognito::UserPool
- AWS::Cognito::UserPoolClient
- AWS::Cognito::UserPoolDomain
- AWS::Cognito::UserPoolGroup
- AWS::Cognito::UserPoolUser
- AWS::Cognito::UserPoolUserToGroupAttachment
- AWS::Cognito::IdentityPool
- AWS::Cognito::IdentityPoolRoleAttachment
- AWS::IAM::Role
- AWS::IAM::Policy

## CognitoConstructProps

```typescript
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
  noRole?: boolean;
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
  rootDomain?: string;
  /**
   * The subDomain to user for the UserPoolDomain
   * @example 'auth' will create UserPoolDomain at 'auth.example.com'
   * @default 'auth'
   */
  subDomain?: string;
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
```

## Usage Examples

```typescript
import { CDNConstruct } from 'ful-stack-pattern';

interface RestrictiveAuthProps {
  prefix: string;
  authenticatedRoleArn: string;
  frontendUrls: string[]; // most likely your domain(s) or the cloudfront url
}

export class RestrictiveAuthStack extends Stack {
  private auth: CognitoConstruct
  constructor(scope: Construct, id: string, props: RestrictiveAuthProps) {
    super(scope, id, props);

    // micro-frontend your auth through cognito
    let subDomain = 'auth';
    //       prod: host auth at `auth.example.com`
    if (props.stage !== 'prod') {
      // non-prod: host auth at `auth.dev.example.com` and frontend will be
      //           at `dev.example.com`
      subDomain += `.${props.stage}`;
    }

    this.auth = new CognitoConstruct(this, 'Cognito', {
      prefix: props.prefix,
      subDomain,
      rootDomain: 'example.com',
      // creates an IdentityPool but no IAM. Associates roleArn with pool
      authenticatedRole: props.authenticatedRoleArn,
      groups: [{
        noIam: true, // safe for iam restrictive enterprise environments
        groupName: 'admin',
        // shameless plug if you need consultation reach ot to me on LinkedIn
        // https://www.linkedin.com/in/matthew-keil/
        userEmails: ['your_consultant_matt@yourDomain.com'],
      }],
      userPoolClient: {
        ...(props?.userPoolClient ?? {}),
        oAuth: {
          ...(props?.userPoolClient?.oAuth ?? {}),
          callbackUrls: frontendUrls
            .concat('http://localhost:3000')
            .map(url => `${url}/auth/login`)
            .concat(props?.userPoolClient?.oAuth?.callbackUrls ?? []),
          logoutUrls: frontendUrls
            .concat('http://localhost:3000')
            .map(url => `${url}/auth/logout`)
            .concat(props?.userPoolClient?.oAuth?.logoutUrls ?? [])
        }
      }
    });
  }
}


interface LessRestrictiveProps {
  prefix: string;
}
/**
 * this may look simple but it builds a userPool, userPoolClient, identityPool
 * role with (absurd) policy, role attachment, a group, any number of users
 * and group/user attachments and a partridge in a pear tree
 *
 * Feel free to use this construct in a stack and then make a loop to call
 * the `addAdmin()` function for a whole gaggle of users in an array that
 * HR gave you
 */
export class LessRestrictiveStack extends NestedStack {
  constructor(scope: Construct, id: string, props: LessRestrictiveProps) {
    super(scope, id, props);
    new CognitoConstruct(this, 'Cognito', {
      prefix: props.prefix,
      groups: [{
        groupName: 'admin',
        policyStatements: [
          new PolicyStatement({
            actions: ['*'],
            resources: ['*'],
          }),
        ]
      }]
    });
  }

  public addAdmin(email: string) {
    return this.auth.addUser(email, ['admin']);
  }
}
```
