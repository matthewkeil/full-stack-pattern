import { Construct, Environment, RemovalPolicy } from '@aws-cdk/core';
import { BaseNestedStack, BaseNestedStackProps } from '../stacks/BaseStack';
import { CDNNestedStack } from '../stacks/cdn/CDNNestedStack';
import { CDNConstructProps } from '../stacks/cdn/CDNConstruct';
import { CognitoConstructProps } from '../stacks/cognito/CognitoConstruct';
import { CognitoNestedStack } from '../stacks/cognito/CognitoNestedStack';
import { CoreConstructProps } from '../stacks/core/CoreConstruct';
import { CoreNestedStack } from '../stacks/core/CoreNestedStack';
import { ServerlessNestedStack } from '../stacks/serverless/ServerlessNestedStack';
import { ServerlessConstructProps } from '../stacks/serverless/ServerlessConstruct';

export interface FullStackProps extends BaseNestedStackProps {
  prefix: string;
  env: Required<Environment>;
  stage: string;
  profile?: string;
  devPort?: string;
  core: CoreConstructProps;
  frontend: CDNConstructProps;
  backend: Omit<ServerlessConstructProps, 'cors'> & {
    cors?: Partial<ServerlessConstructProps['cors']>;
  };
  auth?: CognitoConstructProps & {
    logoutPath?: string;
    callBackPath?: string;
  };
}

// export interface FullStackProps extends Omit<FullStackBranchProps, "core"> {
//   core: CoreStackProps;
// }

// export class FullStack extends Construct {
//   constructor(scope: Construct, id: string, props: FullStackProps) {
//     super(scope, id, props);
//     const { prefix, core } = props;

//     const buildHzOrCert = !coreProps.hostedZoneId || !props.coreProps.certificateArn;
//     const coreStack = new CoreStack(this, "Core", {
//       ...core,
//       prefix,
//       removalPolicy: buildHzOrCert ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY
//     });

//     const branchStack = new FullStackBranch(this, 'Branch', {})
//   }
// }

export class FullStack extends BaseNestedStack {
  constructor(scope: Construct, id: string, props: FullStackProps) {
    super(scope, id, props);
    const {
      env,
      prefix,
      stage,
      devPort,
      core: coreProps,
      auth: authProps,
      frontend: frontendProps,
      backend: backendProps
    } = props;

    const buildHzOrCert = !coreProps.hostedZoneId || !coreProps.certificateArn;
    const coreStack = new CoreNestedStack(this, 'Core', {
      ...coreProps,
      prefix,
      removalPolicy: buildHzOrCert ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY
    });

    const frontendStack = new CDNNestedStack(this, 'Frontend', {
      ...frontendProps,
      prefix,
      stage,
      certificate: coreStack.certificate,
      hostedZone: coreStack.hostedZone,
      rootDomain: coreProps.rootDomain
    });

    const devAddress = `http://localhost:${devPort ?? 4200}`;
    const urls = (frontendStack.urls ?? []).map(url => `https://${url}`).concat(devAddress);
    const authStack = new CognitoNestedStack(this, 'Auth', {
      ...authProps,
      prefix,
      groups: authProps?.groups ?? [
        {
          groupName: 'admin'
        }
      ],
      userPoolClient: {
        ...(authProps?.userPoolClient ?? {}),
        oAuth: {
          ...(authProps?.userPoolClient?.oAuth ?? {}),
          callbackUrls: urls
            .map(url => url + authProps?.callBackPath ?? '')
            .concat(authProps?.userPoolClient?.oAuth?.callbackUrls ?? []),
          logoutUrls: urls
            .map(url => url + authProps?.logoutPath ?? '')
            .concat(authProps?.userPoolClient?.oAuth?.logoutUrls ?? [])
        }
      }
    });

    new ServerlessNestedStack(this, 'Backend', {
      ...backendProps,
      env,
      prefix,
      auth: authStack,
      frontend: frontendStack,
      cors: {
        ...(backendProps.cors ?? {}),
        allowOrigins: urls.concat(backendProps.cors?.allowOrigins ?? [])
      }
    });
  }
}
