import { resolve } from 'path';
import { nanoid } from 'nanoid';
import { IBucket } from '@aws-cdk/aws-s3';
import { AssetCode, Runtime } from '@aws-cdk/aws-lambda';
import { Effect, IRole, PolicyStatement } from '@aws-cdk/aws-iam';
import { Environment, Construct, CustomResource, Stack } from '@aws-cdk/core';

import { Mutable } from '../../lib';
import { ConfigFileProviderProps } from '../../providers/configFileProvider';
import { Lambda, LambdaProps } from './Lambda';

export type ConfigFileProps<T extends Record<string, unknown>> = Omit<
  ConfigFileProviderProps<T>,
  'bucketName'
> & {
  /**
   * The Bucket to upload the file to
   */
  bucket: IBucket;

  /**
   * The prefix to use for the resources.  Will prefix all resource names with
   * this value. For more info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   */
  prefix?: string;

  /**
   * If will create its own stack, you can specify the env
   */
  env?: Environment;

  /**
   * For IAM restrictive accounts you can pass in a pre-built role for
   * the deployment
   */
  deploymentRole?: IRole | string;
};

export class ConfigFile<T extends Record<string, unknown>> extends Construct {
  private configFileProvider?: Lambda;
  private stack: Stack;

  constructor(scope: Construct, id: string, private props: ConfigFileProps<T>) {
    super(scope, id);

    try {
      this.stack = Stack.of(scope);
    } catch {
      if (!props.env) {
        throw new Error('No environment found for ConfigFileStack');
      }
      this.stack = new Stack(scope, 'ConfigFileStack', {
        env: props.env,
        stackName: `config-file-stack-${nanoid()}`
      });
    }

    const { fileName, mergeExisting, config } = props;

    new CustomResource(this.stack, 'ConfigFile', {
      serviceToken: this.getServiceToken(),
      resourceType: 'Custom::ConfigFile',
      properties: {
        config,
        fileName,
        mergeExisting,
        bucketName: this.props.bucket.bucketName,
        IDEMOPOTENCY_TOKEN: Date.now() // makes sure config file is updated
      }
    });
  }

  public getServiceToken(): string {
    if (this.configFileProvider) {
      return this.configFileProvider.function.functionArn;
    }

    const CONFIG_FILE_PROVIDER_ID = 'ConfigFileProvider';
    const existingProvider = this.stack.node.tryFindChild(CONFIG_FILE_PROVIDER_ID) as
      | Lambda
      | undefined;
    if (existingProvider) {
      this.configFileProvider = existingProvider;
      return this.configFileProvider.function.functionArn;
    }

    const customResourceProviderProps: Mutable<LambdaProps> = {
      prefix: this.props.prefix,
      name: 'config-file-provider',
      // in order for the library to be importable this path should be from the dist
      // output of this file to the dist output of the folder with the webpacked bundle
      code: new AssetCode(resolve(__dirname, '..', '..', 'providers', 'configFileProvider')),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_14_X
    };

    if (this.props.deploymentRole) {
      customResourceProviderProps.role = this.props.deploymentRole;
    } else {
      customResourceProviderProps.statements = [
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['s3:PutObject', 's3:DeleteObject'],
          resources: [this.props.bucket.bucketArn, this.props.bucket.arnForObjects('*')]
        })
      ];
    }

    this.configFileProvider = new Lambda(
      this.stack,
      CONFIG_FILE_PROVIDER_ID,
      customResourceProviderProps
    );

    return this.configFileProvider.function.functionArn;
  }
}
