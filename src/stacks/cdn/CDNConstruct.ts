import { Construct, Duration, RemovalPolicy, Stack } from '@aws-cdk/core';
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
import { ICertificate } from '@aws-cdk/aws-certificatemanager';
import { IRole } from '@aws-cdk/aws-iam';
import { ARecord, IHostedZone, RecordTarget } from '@aws-cdk/aws-route53';
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets';

import { Mutable, toKebab, toPascal } from '../../../lib';
import { IRestApi } from '@aws-cdk/aws-apigateway';
import { Lambda } from '../../constructs/Lambda';

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

export class CDNConstruct extends Construct {
  private static urlSafe(stage: string): string {
    return toKebab(stage.replace(/[^a-zA-Z0-9_-]*/g, ''));
  }

  public static buildUrls({
    stage,
    rootDomain,
    buildWwwSubdomain = true
  }: {
    stage: string;
    rootDomain: string;
    buildWwwSubdomain?: boolean;
  }): string[] {
    if (stage === 'prod') {
      if (buildWwwSubdomain) {
        return [`www.${rootDomain}`, rootDomain];
      }
      return [rootDomain];
    }
    return [`${CDNConstruct.urlSafe(stage)}.${rootDomain}`];
  }

  public static getBucketName = ({
    bucketName,
    prefix,
    urls
  }: Pick<CDNConstructProps, 'bucketName' | 'prefix'> & { urls?: string[] }) => {
    if (bucketName) {
      return bucketName;
    }

    if (urls) {
      return urls[0];
    }

    return `${prefix}-cdn`;
  };

  public bucket: IBucket;
  public distribution: CloudFrontWebDistribution;
  public configFileProvider: Lambda;
  public configFileServiceToken: string;
  public urls?: string[];

  private originAccessIdentity: OriginAccessIdentity;

  constructor(scope: Construct, id: string, private props: CDNConstructProps) {
    super(scope, id);
    if (props.rootDomain) {
      if (!props.stage) {
        throw new Error('CDNConstruct requires a stage when rootDomain is provided');
      }
      this.urls = CDNConstruct.buildUrls({
        rootDomain: props.rootDomain,
        stage: props.stage,
        buildWwwSubdomain: props.buildWwwSubdomain
      });
    }

    this.originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity', {
      comment: this.props.prefix
    });
    this.bucket = this.buildBucket();
    this.distribution = this.buildDistribution();
    this.configFileProvider = this.buildCodeDeployment();
    this.configFileServiceToken = this.configFileProvider.function.functionArn;

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
    if (this.props.bucketName) {
      const bucket = Bucket.fromBucketName(this, 'Bucket', this.props.bucketName);
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
      return bucket;
    }

    const bucketName = CDNConstruct.getBucketName(this.props);
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
      }
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
      originConfigs,
      defaultRootObject: 'index.html',
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
        }
      ]
    };

    if (this.urls) {
      if (!this.props.certificate) {
        throw new Error('CDNConstructProps.certificate required when building custom domains');
      }
      distributionConfig.viewerCertificate = {
        aliases: this.urls,
        props: {
          acmCertificateArn: this.props.certificate.certificateArn,
          sslSupportMethod: 'sni-only',
          minimumProtocolVersion: 'TLSv1.2_2018'
        }
      };
    }

    const distribution = new CloudFrontWebDistribution(this, 'Distribution', distributionConfig);

    if (this.props.dontOverrideLogicalId !== true) {
      (distribution.node.defaultChild as CfnDistribution).overrideLogicalId('Distribution');
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
