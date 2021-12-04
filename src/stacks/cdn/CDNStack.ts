import { StackProps, Stack, Construct, Environment } from '@aws-cdk/core';
import { CloudFrontWebDistribution } from '@aws-cdk/aws-cloudfront';
import { IBucket } from '@aws-cdk/aws-s3';
import { Lambda } from '../../constructs/Lambda';
import { CDNConstruct, CDNConstructProps } from './CDNConstruct';

export interface CDNStackProps extends StackProps, CDNConstructProps {
  env: Required<Environment>;
}

export class CDNStack extends Stack {
  public urls?: string[];
  public bucket: IBucket;
  public distribution: CloudFrontWebDistribution;
  public configFileProvider: Lambda;

  constructor(scope: Construct, id: string, props: CDNStackProps) {
    super(scope, id, {
      ...props,
      stackName: props.stackName ?? `${props.prefix}-cdn`
    });
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
