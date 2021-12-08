import { Duration, NestedStackProps, NestedStack, Construct } from '@aws-cdk/core';
import { CloudFrontWebDistribution } from '@aws-cdk/aws-cloudfront';
import { IBucket } from '@aws-cdk/aws-s3';
import { CDNConstruct, CDNConstructProps } from './CDNConstruct';

export interface CDNNestedStackProps
  extends Omit<NestedStackProps, 'removalPolicy' | 'timeout'>,
    CDNConstructProps {
  stackTimeout?: Duration;
}

export class CDNNestedStack extends NestedStack {
  public urls?: string[];
  public bucket: IBucket;
  public distribution: CloudFrontWebDistribution;

  constructor(scope: Construct, id: string, props: CDNNestedStackProps) {
    super(scope, id, {
      ...props,
      removalPolicy: undefined,
      timeout: props.stackTimeout
    });
    const { bucket, distribution, urls } = new CDNConstruct(this, 'CDNConstruct', props);
    this.urls = urls;
    this.bucket = bucket;
    this.distribution = distribution;
  }
}
