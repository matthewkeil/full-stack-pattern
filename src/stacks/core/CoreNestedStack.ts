import { ICertificate } from '@aws-cdk/aws-certificatemanager';
import { IHostedZone } from '@aws-cdk/aws-route53';
import { Construct, Environment } from '@aws-cdk/core';
import { getHostedZoneIdForDomain } from '../../../lib/aws/route53';
import { BaseNestedStack, BaseNestedStackProps } from '../BaseStack';
import { CoreConstruct, CoreConstructProps } from './CoreConstruct';

export interface CoreNestedStackProps extends BaseNestedStackProps, CoreConstructProps {}
export interface AsyncCoreNestedStackProps extends CoreNestedStackProps {
  env: Required<Environment>;
  profile: string;
}

export class CoreNestedStack extends BaseNestedStack {
  public certificate!: ICertificate;
  public hostedZone!: IHostedZone;
  constructor(scope: Construct, id: string, props: CoreNestedStackProps) {
    super(scope, id, props);
    const { hostedZone, certificate } = new CoreConstruct(this, 'CoreConstruct', props);
    this.certificate = certificate;
    this.hostedZone = hostedZone;
  }
  static async create(scope: Construct, id: string, props: AsyncCoreNestedStackProps) {
    let hostedZoneId = props.hostedZoneId;
    if (!hostedZoneId) {
      hostedZoneId = await getHostedZoneIdForDomain({
        rootDomain: props.rootDomain,
        region: props.env.region,
        profile: props.profile
      });
    }
    return new CoreNestedStack(scope, id, {
      ...props,
      hostedZoneId
    });
  }
}
