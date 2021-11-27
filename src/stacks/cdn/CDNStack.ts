import { CloudFrontWebDistribution } from '@aws-cdk/aws-cloudfront';
import { IBucket } from '@aws-cdk/aws-s3';
import { StackProps, Stack, Construct } from '@aws-cdk/core';
import { Lambda } from '../../constructs/Lambda';
import { CDNConstruct, CDNConstructProps } from './CDNConstruct';

export interface CDNStackProps extends StackProps, CDNConstructProps {}

export class CDNStack extends Stack {
  public urls?: string[];
  public bucket: IBucket;
  public distribution: CloudFrontWebDistribution;
  public configFileProvider: Lambda;

  constructor(scope: Construct, id: string, props: CDNStackProps) {
    super(scope, id, props);
    const { bucket, distribution, urls, configFileProvider } = new CDNConstruct(
      this,
      'CDNConstruct',
      props
    );
    this.urls = urls;
    this.bucket = bucket;
    this.distribution = distribution;
    this.configFileProvider = configFileProvider;
  }
}
