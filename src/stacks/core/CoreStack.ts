import { ICertificate } from '@aws-cdk/aws-certificatemanager';
import { IHostedZone } from '@aws-cdk/aws-route53';
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { getHostedZoneIdForDomain } from '../../../lib/aws/route53';
import { CoreConstruct, CoreConstructProps } from './CoreConstruct';

export interface CoreStackProps extends StackProps, CoreConstructProps {}
export interface AsyncCoreStackProps extends CoreStackProps {
  profile: string;
}

export class CoreStack extends Stack {
  public certificate!: ICertificate;
  public hostedZone!: IHostedZone;

  constructor(scope: Construct, id: string, props: CoreStackProps) {
    super(scope, id, props);
    const { hostedZone, certificate } = new CoreConstruct(this, 'CoreConstruct', props);
    this.certificate = certificate;
    this.hostedZone = hostedZone;
  }

  static async create(scope: Construct, id: string, props: AsyncCoreStackProps) {
    let hostedZoneId = props.hostedZoneId;
    if (!hostedZoneId) {
      hostedZoneId = await getHostedZoneIdForDomain({
        rootDomain: props.rootDomain,
        region: Stack.of(this).region,
        profile: props.profile
      });
    }
    return new CoreStack(scope, id, {
      ...props,
      hostedZoneId
    });
  }
}
