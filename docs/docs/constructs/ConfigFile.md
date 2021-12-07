---
sidebar_position: 2
---

# ConfigFile

Custom Resource backed Construct that builds and uploads a configuration file for the frontend. Can work either in a Stack or if built in a higher order Construct it will build its own stack.

## ConfigFileProps

```typescript
export interface ConfigFileProps<T extends Record<string, unknown>> {
  /**
   * The bucketName of where to upload the file
   */
  bucket: IBucket;

  /**
   * The filename for the config file.  Supports .yml, .yaml, .json, or .js
   * extensions.
   */
  fileName: string;

  /**
   * Will go to the file in S3 and merge the passed configuration with the
   * existing configuration that is already in the file in S3.  Useful when
   * only part of the config changes by environment but the rest is fixed
   * and complex
   */
  mergeExisting?: boolean;

  /**
   * The actual configuration that will get turned into the file.  Library
   *
   * - uses YAML.stringify(config) for .yaml and .yml files
   * - uses JSON.stringify(config) for .json files
   * - creates a js file by stringifying the object with JSON.stringify and
   *   wrapping it with `var CONFIG_FILE = JSON.parse('${stringified}');`.
   *   Makes it globally available to the code in the browser via
   *   <head><script type="text/javascript" src="/config.js" /></head>
   */
  config: T;

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
}
```

## Usage Example

```typescript
import { App } from '@aws-cdk/core';
import { CDNStack, ConfigFile } from 'full-stack-pattern';

const app = new App();
const prefix = 'be-first-2-market-dev';
const env = {
  account: '123456789012',
  region: 'us-east-1'
};
const auth = new CognitoStack(app, 'Cognito', { env, prefix });
const configured = new CDNStack(app, 'CDNStack', {
  env,
  prefix
  codePaths: [resolve(__dirname, '..', 'build')]
});


interface AuthProps {
  region: string;
  userPoolId: string;
  userPoolClientId: string;
  userPoolDomain: string;
}
new ConfigFile<AuthProps>(app, 'ConfigFile', {
  env,
  prefix,
  bucket: this.configured.bucket,
  fileName: 'config.json',
  // this is a strongly typed `config: AuthProps`
  config: {
    region: env.region
    userPoolId: auth.userPool.userPoolId,
    userPoolClientId: auth.userPoolClient.userPoolClientId,
    userPoolDomain: auth.userPoolDomain.domain
  }
});
```
