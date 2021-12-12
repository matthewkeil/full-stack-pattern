import { Construct, Duration, RemovalPolicy, Stack } from '@aws-cdk/core';
import { IRole } from '@aws-cdk/aws-iam';
import { IRestApi } from '@aws-cdk/aws-apigateway';
import { ICertificate } from '@aws-cdk/aws-certificatemanager';
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets';
import { ARecord, IHostedZone, RecordTarget } from '@aws-cdk/aws-route53';
import { BucketDeployment, BucketDeploymentProps, Source } from '@aws-cdk/aws-s3-deployment';
import {
  CloudFrontWebDistribution,
  OriginAccessIdentity,
  SourceConfiguration,
  OriginProtocolPolicy,
  CloudFrontAllowedMethods,
  CloudFrontAllowedCachedMethods,
  CloudFrontWebDistributionProps,
  CfnDistribution
} from '@aws-cdk/aws-cloudfront';
import {
  BlockPublicAccess,
  Bucket,
  IBucket,
  BucketEncryption,
  CfnBucketPolicy,
  BucketProps,
  CfnBucket
} from '@aws-cdk/aws-s3';

import { Mutable } from '../../../lib/Mutable';
import { buildUrls } from '../../../lib/buildUrls';
import { toPascal } from '../../../lib/changeCase';
import { bucketExists } from '../../../lib/aws/s3';

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
   * This is for accounts/clients that have high security and restrict making
   * buckets.  Also helpful during development and forget to delete a bucket.
   * Will not throw and error when deploying.  Sets up a BucketPolicy for
   * access to the existing bucket. When set to `true`, you must also provide
   * the `bucketName`
   */
  useExistingBucket?: boolean;

  /**
   * This is for accounts/clients that have high security and restrict making
   * bucket policies. Has no effect unless `props.useExistingBucket = true`
   */
  noBucketPolicy?: boolean;

  /**
   * Set the bucketName
   */
  bucketName?: string;

  /**
   * Allows hosting at a custom, non-cloudfront, url.  The root domain
   * of the website that is being hosted without the sub-domain. ie. `example.com`.
   * If provided, must also provide a value for `stage`, `hostedZone` and `certificate`.
   */
  baseDomain?: string;

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
  bucketProps?: Omit<Mutable<BucketProps>, 'removalPolicy' | 'autoDeleteObjects'>;

  /**
   * Optional. Props that will get passed to the WebDistribution construct.
   */
  distributionProps?: Mutable<CloudFrontWebDistributionProps> & { logicalId?: string };

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

  // /**
  //  * @param {boolean} [includeSecurityHeaders]
  //  * @description Optional. Apply security response headers.  The defaults when
  //  * using this option will follow the "CORS allow all origins with preflight and security headers"
  //  * managed policy. See
  //  * https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-response-headers-policies.html
  //  * for more information on what will be set.  You can override any of the defaults with the `responseHeadersPolicy`
  //  * prop.
  //  */
  // includeSecurityHeaders?: boolean;

  // /**
  //  * @param {CfnResponseHeadersPolicy.ResponseHeadersPolicyConfigProperty} [responseHeadersPolicy]
  //  * @description Optional. Config to add security headers to CloudFront.
  //  * https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-responseheaderspolicy-responseheaderspolicyconfig.html
  //  */
  // responseHeadersPolicy?: Pick<
  //   CfnResponseHeadersPolicy.ResponseHeadersPolicyConfigProperty,
  //   'corsConfig' | 'customHeadersConfig' | 'securityHeadersConfig'
  // >;
}

interface GetBucketNameProps
  extends Partial<
    Pick<CDNConstructProps, 'bucketName' | 'prefix' | 'stage' | 'baseDomain' | 'buildWwwSubdomain'>
  > {
  // used internally by the Construct. list of target urls for stage
  urls?: ReturnType<typeof buildUrls>;
}
export class CDNConstruct extends Construct {
  /**
   * Exposes the algorithm that is used to generate the bucket name from the
   * construct `props`.  Useful if you need to know the bucket name for other
   * constructs and are getting a circular dependency error when importing the
   * IBucket.  Gotta love chicken and the egg ala cdk.
   */
  public static getBucketName = (props: GetBucketNameProps) => {
    const { bucketName, prefix, urls, ...buildUrlProps } = props;
    if (bucketName) {
      return bucketName;
    }

    function getFromUrls(urls: ReturnType<typeof buildUrls>) {
      return urls[1] ? urls[1] : urls[0];
    }
    if (urls) {
      return getFromUrls(urls);
    }

    if (buildUrlProps.stage && buildUrlProps.baseDomain) {
      const urls = buildUrls({
        subDomain: 'www',
        buildWwwSubdomain: buildUrlProps.buildWwwSubdomain,
        stage: buildUrlProps.stage,
        baseDomain: buildUrlProps.baseDomain
      });
      return getFromUrls(urls);
    }

    if (!prefix) {
      throw new Error('must provide one: bucketName, urls, prefix or both stage and rootDomain');
    }
    return `${prefix}-cdn`;
  };

  /**
   * This is a helper function to avoid resource collisions during development.
   * When buckets get left behind, rebuilding the stack throws an error. Does a
   * lookup for the bucket that is going to get built and adds
   * `props.bucketName` and `props.useExistingBucket = true` to the props and
   * returns the full props object to be used with `new CDNConstruct()`
   */
  public static async lookupExistingResources(
    props: CDNConstructProps & { region: string; profile?: string }
  ): Promise<CDNConstructProps> {
    const _props = {
      ...props,
      region: undefined,
      profile: undefined
    };

    let urls: ReturnType<typeof buildUrls> | undefined;
    if (props.baseDomain && props.stage) {
      urls = buildUrls({
        subDomain: 'wwww',
        buildWwwSubdomain: props.buildWwwSubdomain,
        stage: props.stage,
        baseDomain: props.baseDomain
      });
    }
    const bucketName = CDNConstruct.getBucketName({
      ...props,
      urls
    });
    if (await bucketExists({ profile: props.profile, region: props.region, bucketName })) {
      console.log(`Bucket ${bucketName} already exists. Will deploy frontend to existing bucket`);
      _props.bucketName = bucketName;
    }
    return _props;
  }

  public bucket: IBucket;
  public distribution: CloudFrontWebDistribution;
  public urls?: ReturnType<typeof buildUrls>;

  private originAccessIdentity: OriginAccessIdentity;

  constructor(scope: Construct, id: string, private props: CDNConstructProps) {
    super(scope, id);
    if (props.baseDomain) {
      if (!props.stage) {
        throw new Error('CDNConstruct requires a stage when rootDomain is provided');
      }
      this.urls = buildUrls({
        subDomain: 'www',
        buildWwwSubdomain: props.buildWwwSubdomain,
        stage: props.stage,
        baseDomain: props.baseDomain
      });
    }

    this.originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity', {
      comment: this.props.prefix
    });
    this.bucket = this.buildBucket();
    this.distribution = this.buildDistribution();
    this.buildCodeDeployment();

    for (const url of this.urls ?? []) {
      if (!this.props.hostedZone) {
        throw new Error('CDNConstructProps.hostedZone required when building custom domains');
      }
      new ARecord(this, `${toPascal(url)}ARecord`, {
        zone: this.props.hostedZone,
        recordName: url,
        target: RecordTarget.fromAlias(new CloudFrontTarget(this.distribution))
      });
    }
  }

  private buildBucket() {
    if (this.props.useExistingBucket) {
      if (!this.props.bucketName) {
        throw new Error('must provide the bucketName when you useExistingBucket');
      }
      const bucket = Bucket.fromBucketName(this, 'Bucket', this.props.bucketName);
      if (!this.props.noBucketPolicy) {
        new CfnBucketPolicy(this, 'BucketPolicy', {
          bucket: bucket.bucketName,
          policyDocument: {
            Statement: [
              {
                Effect: 'Allow',
                Action: ['s3:GetObject'],
                Principal: {
                  CanonicalUser: this.originAccessIdentity
                    .cloudFrontOriginAccessIdentityS3CanonicalUserId
                },
                Resource: [bucket.arnForObjects('*')]
              }
            ]
          }
        });
      }
      return bucket;
    }

    const bucketName = CDNConstruct.getBucketName({ ...this.props, urls: this.urls });
    const removalPolicy = this.props.removalPolicy ?? RemovalPolicy.DESTROY;
    const autoDeleteObjects = removalPolicy === RemovalPolicy.DESTROY;
    
    const bucket = new Bucket(this, 'Bucket', {
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      ...this.props.bucketProps,
      autoDeleteObjects,
      removalPolicy,
      bucketName
    });
    if (this.props.dontOverrideLogicalId !== true) {
      (bucket.node.defaultChild as CfnBucket).overrideLogicalId('Bucket');
    }
    return bucket;
  }

  private buildDistribution() {
    const originConfigs: Mutable<SourceConfiguration>[] = [
      {
        behaviors: [
          {
            isDefaultBehavior: true,
            forwardedValues: { queryString: true }
          }
        ],
        s3OriginSource: {
          s3BucketSource: this.bucket,
          originAccessIdentity: this.originAccessIdentity
        }
      },
      ...(this.props.distributionProps?.originConfigs ?? [])
    ];

    if (this.props.api) {
      const domain = `${this.props.api.restApi.restApiId}.execute-api.${
        Stack.of(this).region
      }.amazonaws.com`;

      originConfigs.push({
        customOriginSource: {
          domainName: domain,
          originProtocolPolicy: OriginProtocolPolicy.HTTPS_ONLY,
          originPath: !this.props.api.apiStage
            ? '/prod'
            : this.props.api.apiStage.startsWith('/')
            ? this.props.api.apiStage
            : `/${this.props.api.apiStage}`
        },
        behaviors: [
          {
            pathPattern: this.props.api.apiPathPattern ?? '/api/*',
            forwardedValues: {
              queryString: true,
              headers: [
                'Access-Control-Request-Headers',
                'Access-Control-Request-Method',
                'Origin',
                'Authorization'
              ]
            },
            minTtl: Duration.seconds(0),
            defaultTtl: Duration.seconds(0),
            maxTtl: Duration.seconds(0),
            allowedMethods: CloudFrontAllowedMethods.ALL,
            cachedMethods: CloudFrontAllowedCachedMethods.GET_HEAD_OPTIONS
          }
        ]
      });
    }

    const distributionConfig: Mutable<CloudFrontWebDistributionProps> = {
      defaultRootObject: 'index.html',
      ...this.props.distributionProps,
      originConfigs,
      errorConfigurations: [
        {
          errorCode: 403,
          responseCode: 200,
          responsePagePath: '/index.html',
          errorCachingMinTtl: 0
        },
        {
          errorCode: 404,
          responseCode: 200,
          responsePagePath: '/index.html',
          errorCachingMinTtl: 0
        },
        ...(this.props.distributionProps?.errorConfigurations ?? [])
      ]
    };

    if (this.urls) {
      if (!this.props.certificate) {
        throw new Error('CDNConstructProps.certificate required when building custom domains');
      }
      distributionConfig.viewerCertificate = {
        aliases: (this.props.distributionProps?.viewerCertificate?.aliases ?? []).concat(this.urls),
        props: {
          acmCertificateArn: this.props.certificate.certificateArn,
          sslSupportMethod: 'sni-only',
          minimumProtocolVersion: 'TLSv1.2_2021',
          ...(this.props.distributionProps?.viewerCertificate?.props ?? {})
        }
      };
    }

    const distribution = new CloudFrontWebDistribution(this, 'Distribution', distributionConfig);

    if (this.props.dontOverrideLogicalId !== true) {
      (distribution.node.defaultChild as CfnDistribution).overrideLogicalId(
        this.props.distributionProps?.logicalId ?? 'Distribution'
      );
    }

    return distribution;

    /**
     * TODO: CDK doesn't support security headers yet. Once it does we need to update
     * the distribution to apply the ResponseHeadersPolicy.  Don't want to
     * loose this work as there is a PR ready to be merged but its not fully
     * supported yet as of writing this.
     */
    // if (this.props.includeSecurityHeaders) {
    //   new CfnResponseHeadersPolicy(this, 'CfnResponseHeadersPolicy', {
    //     responseHeadersPolicyConfig: {
    //       name: this.props.prefix,
    //       corsConfig: {
    //         originOverride: false,
    //         accessControlAllowCredentials: true,
    //         accessControlAllowHeaders: {
    //           items: ['*']
    //         },
    //         accessControlAllowMethods: {
    //           items: ['OPTIONS', 'GET', 'PUT', 'POST', 'PATCH', 'DELETE']
    //         },
    //         accessControlAllowOrigins: {
    //           items: ['*']
    //           // TODO: lets try to restrict this to the domains we know about
    //           // when we get a minute to test that this works.
    //           // this.urls?.map(url => `https://${url}`) ?? [
    //           //   this.distribution.distributionDomainName
    //           // ]
    //         },
    //         ...(this.props.responseHeadersPolicy?.corsConfig ?? {})
    //       },
    //       customHeadersConfig: this.props.responseHeadersPolicy?.customHeadersConfig,
    //       securityHeadersConfig: {
    //         referrerPolicy: {
    //           referrerPolicy: 'strict-origin-when-cross-origin',
    //           override: false
    //         },
    //         strictTransportSecurity: {
    //           accessControlMaxAgeSec: 31536000,
    //           override: false,
    //           includeSubdomains: false,
    //           preload: false
    //         },
    //         contentTypeOptions: {
    //           override: false
    //         },
    //         frameOptions: {
    //           frameOption: 'SAMEORIGIN',
    //           override: false
    //         },
    //         xssProtection: {
    //           modeBlock: true,
    //           protection: true,
    //           override: false
    //         },
    //         ...(this.props.responseHeadersPolicy?.securityHeadersConfig ?? {})
    //       }
    //     }
    //   });
    // }

    // const distributionConfig: Mutable<DistributionProps> = {
    //   defaultBehavior: {
    //     origin: new S3Origin(this.bucket, { originAccessIdentity: this.originAccessIdentity })
    //   },
    //   defaultRootObject: 'index.html',
    //   errorConfigurations: [
    //     {
    //       errorCode: 403,
    //       responseCode: 200,
    //       responsePagePath: '/index.html',
    //       errorCachingMinTtl: 0
    //     },
    //     {
    //       errorCode: 404,
    //       responseCode: 200,
    //       responsePagePath: '/index.html',
    //       errorCachingMinTtl: 0
    //     }
    //   ]
    // };

    // if (this.props.api) {
    //   const domain = `${this.props.api.restApiId}.execute-api.${
    //     Stack.of(this).region
    //   }.amazonaws.com`;

    //   distributionConfig.additionalBehaviors = {
    //     [domain]: {
    //       origin: new HttpOrigin(domain, {
    //         originPath: '/prod',
    //         protocolPolicy: OriginProtocolPolicy.HTTPS_ONLY
    //       })
    //     }
    //   };
    // }
  }

  private buildCodeDeployment() {
    const baseBucketDeploymentProps: Mutable<BucketDeploymentProps> = {
      sources: this.props.codePaths.map(source => Source.asset(source)),
      destinationBucket: this.bucket,
      distribution: this.distribution,
      distributionPaths: ['/*'],
      prune: true
    };

    if (this.props.deploymentRole) {
      baseBucketDeploymentProps.role = this.props.deploymentRole;
    }

    new BucketDeployment(this, 'BucketDeployment', baseBucketDeploymentProps);
  }
}
