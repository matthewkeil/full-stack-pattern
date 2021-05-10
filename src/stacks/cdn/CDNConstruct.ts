import { Construct, RemovalPolicy } from '@aws-cdk/core';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';
import { CloudFrontWebDistribution, OriginAccessIdentity } from '@aws-cdk/aws-cloudfront';
import {
  BlockPublicAccess,
  Bucket,
  IBucket,
  BucketEncryption,
  CfnBucketPolicy
} from '@aws-cdk/aws-s3';
import {
  Effect,
  Role,
  CanonicalUserPrincipal,
  PolicyDocument,
  PolicyStatement
} from '@aws-cdk/aws-iam';
import { ICertificate } from '@aws-cdk/aws-certificatemanager';
import { ARecord, IHostedZone, RecordTarget } from '@aws-cdk/aws-route53';
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets';
import { toKebab, toPascal } from '../../../lib/changeCase';
import { BaseConstruct, BaseConstructProps } from '../../constructs/BaseConstruct';

export interface CDNConstructProps extends BaseConstructProps {
  codePaths: string[];
  hostedZone: IHostedZone;
  certificate?: ICertificate;
  rootDomain?: string;
  stage?: string;
  bucketName?: string;
  bucketExists?: boolean;
  buildWwwSubdomain?: boolean;
}

export class CDNConstruct extends BaseConstruct {
  public static GET_BUCKET_NAME = ({
    bucketName,
    prefix
  }: {
    bucketName?: string;
    prefix: string;
  }) => bucketName ?? toKebab(`${prefix}-frontend`);

  public bucket: IBucket;
  public distribution: CloudFrontWebDistribution;
  public urls?: string[];

  constructor(scope: Construct, id: string, private props: CDNConstructProps) {
    super(scope, id, props);

    const bucketName = CDNConstruct.GET_BUCKET_NAME(props);
    const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');

    if (this.props.bucketExists) {
      this.bucket = Bucket.fromBucketName(this, 'Bucket', bucketName);
      new CfnBucketPolicy(this, 'BucketPolicy', {
        bucket: this.bucket.bucketName,
        policyDocument: {
          Statement: [
            {
              Effect: 'Allow',
              Action: ['s3:getObject', 's3:GetObject'],
              Principal: {
                CanonicalUser: originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId
              },
              Resource: [this.bucket.arnForObjects('*')]
            }
          ]
        }
      });
    } else {
      this.bucket = new Bucket(this, 'Bucket', {
        bucketName,
        versioned: true,
        encryption: BucketEncryption.S3_MANAGED,
        blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
        autoDeleteObjects: !this.prod,
        removalPolicy: this.prod ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY
      });
    }

    if (props.rootDomain && props.stage) {
      this.urls = this.buildUrls({
        rootDomain: props.rootDomain,
        stage: props.stage,
        buildWwwSubdomain: props.buildWwwSubdomain
      });
    }

    this.distribution = new CloudFrontWebDistribution(this, 'Distribution', {
      viewerCertificate: this.urls
        ? {
            aliases: this.urls,
            props: {
              acmCertificateArn: props.certificate?.certificateArn,
              sslSupportMethod: 'sni-only',
              minimumProtocolVersion: 'TLSv1.2_2018'
            }
          }
        : undefined,
      originConfigs: [
        {
          behaviors: [{ isDefaultBehavior: true }],
          s3OriginSource: {
            s3BucketSource: this.bucket,
            originAccessIdentity
          }
        }
      ],
      errorConfigurations: [
        {
          errorCode: 403,
          responseCode: 200,
          responsePagePath: '/index.html',
          errorCachingMinTtl: 3600
        },
        {
          errorCode: 404,
          responseCode: 200,
          responsePagePath: '/index.html',
          errorCachingMinTtl: 3600
        }
      ]
    });

    new BucketDeployment(this, 'BucketDeployment', {
      sources: props.codePaths.map(source => Source.asset(source)),
      destinationBucket: this.bucket,
      distribution: this.distribution,
      distributionPaths: ['/*']
    });

    for (const url of this.urls ?? []) {
      new ARecord(this, `${toPascal(url)}ARecord`, {
        zone: props.hostedZone,
        recordName: url,
        target: RecordTarget.fromAlias(new CloudFrontTarget(this.distribution))
      });
    }
  }

  buildUrls({
    stage,
    rootDomain,
    buildWwwSubdomain = true
  }: {
    stage: string;
    rootDomain: string;
    buildWwwSubdomain?: boolean;
  }): string[] {
    if (this.prod) {
      if (buildWwwSubdomain) {
        return [rootDomain, `www.${rootDomain}`];
      }
      return [rootDomain];
    }
    return [`${toKebab(stage)}.${rootDomain}`];
  }
}
