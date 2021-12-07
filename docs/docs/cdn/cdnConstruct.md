---
sidebar_position: 1
---

# CDNConstruct

This is a static asset hosting construct and the basis for the CDNStack and CDNNestedStack. If you are looking for a CDN stack check those docs out.


Assets are stored in S3 and globally edge-hosted using CloudFront. Will optionally setup AliasRecords if passed a HostedZone. Will optionally use a passed Certificate for TLS/SSL.

Built for branch based development with the subdomain and branch name matching for easy showcasing of features to clients. ie if you are using a rootDomain of `example.com` and working on the `special-feature` branch then the dns will be setup for `https://special-feature.example.com`. Also automatically sets up a naked and www subdomain for the prod stage.

Handles creating the `new AssetCode()` for your assets, just pass in the absolute path to the folder where the assets are.

Can also add additional behavior to the Distribution to accommodate hosting your api backend from the frontend url to avoid cors issues.

Sets up a custom resource for uploading a config file to the frontend. Useful when needing to upload login information (userPoolId, userPoolClientId, etc) once the auth stack is built. Can handle json, yaml or js config files.

#### Resource types that are deployed

- AWS::Route53::RecordSet
- AWS::CloudFront::Distribution
- AWS::CloudFront::OriginAccessIdentity
- AWS::S3::BucketPolicy
- AWS::S3::Bucket
- cdk BucketDeployment

## CDNConstructProps

```typescript
export interface CDNConstructProps {
  removalPolicy?: RemovalPolicy;

  /**
   * The prefix to use for the resources.  Will prefix all resource names with this value. For more info, see
   * [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   */
  prefix?: string;

  /**
   * Option to not use fixed logicalId's for the RestApi resource. For more
   * info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   */
  dontOverrideLogicalId?: boolean;

  /**
   * The absolute paths for the code that will be uploaded and
   * hosted via S3/CloudFront.
   */
  codePaths: string[];

  /**
   * When using an existing bucket, pass in the bucketName that should
   * be used.
   */
  bucketName?: string;

  /**
   * Allows hosting at a custom, non-cloudfront, url.  The root domain
   * of the website that is being hosted without the sub-domain. ie. `example.com`.
   * If provided, must also provide a value for `stage`, `hostedZone` and `certificate`.
   */
  rootDomain?: string;

  /**
   * The stage of the website that is being hosted. ex. Using `qa`
   * as the stage will host the site at the sub-domain `qa.example.com`.  When
   * the stage is prod a naked domain will be used and the `buildWwwSubdomain`
   * property will be checked.  If `true` the `www` sub-domain will also be built.
   * ex. `www.example.com` and `example.com` will both be valid.
   */
  stage?: string;

  /**
   * will build www.{rootDomain} alias on `prod` stage in addition
   * to the naked rootDomain. For non-production stages, this is a no-op.
   *
   * @default true
   */
  buildWwwSubdomain?: boolean;

  /**
   * HostedZone to add Distribution AliasRecords to.
   */
  hostedZone?: IHostedZone;

  /**
   * The TLS/SSL certificate to use for the distribution.
   */
  certificate?: ICertificate;

  /**
   * Optional. If creating the hosting bucket, these props will be
   * passed to the Bucket construct. To set removal policy use
   * `CDNConstructProps.removalPolicy`.  When removalPolicy is set to DESTROY,
   * which is the default behavior, autoDeleteObjects will be enabled.
   */
  bucketProps?: Omit<BucketProps, 'removalPolicy' | 'autoDeleteObjects'>;

  api?: {
    /**
     * The RestApi that is being hit via CloudFront.
     */
    restApi: IRestApi;
    /**
     * The api stage (path suffix) at the end of the execute domain.
     *
     * @default "/prod"
     */
    apiStage?: string;
    /**
     * The url paths that will be forwarded to the api.
     *
     * @default "/api/*"
     */
    apiPathPattern?: string;
  };

  /**
   * Deployment role to use when publishing files to S3.
   */
  deploymentRole?: IRole;
}
```

## Usage Example

```typescript
import { CDNConstruct } from 'ful-stack-pattern';

interface FancyStackProps {
  prefix: string;
  hostedZone: IHostedZone;
  certificate: ICertificate;
  config: Record<string, unknown>;
}

class FancyStack extends Stack {
  constructor(scope: Construct, id: string, props: FancyStackProps) {
    super(scope, id, props);

    // this example will serve the contents of the codePath directory
    // from `https://dev.example.com`
    const cdn = new CDNConstruct(this, 'CDNConstruct', {
      stage: 'dev',
      rootDomain: 'example.com',
      bucketName: 'dev-example-com',
      codePaths: [resolve(__dirname, '..', 'frontend', 'build')],
      prefix: props.prefix,
      hostedZone: props.hostedZone,
      certificate: props.certificate
    });
  }
}
```
