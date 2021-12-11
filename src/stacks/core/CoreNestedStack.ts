import { Duration, Construct, Environment, NestedStack, NestedStackProps } from '@aws-cdk/core';
import { ICertificate } from '@aws-cdk/aws-certificatemanager';
import { IHostedZone } from '@aws-cdk/aws-route53';

import { CoreConstruct, CoreConstructProps } from './CoreConstruct';

export interface CoreNestedStackProps
  extends Omit<NestedStackProps, 'removalPolicy' | 'timeout'>,
    CoreConstructProps {
  stackTimeout?: Duration;
}
export interface AsyncCoreNestedStackProps extends CoreNestedStackProps {
  profile: string;
  env: Required<Environment>;
}

export class CoreNestedStack extends NestedStack {
  public certificate!: ICertificate;
  public hostedZone!: IHostedZone;
  constructor(scope: Construct, id: string, props: CoreNestedStackProps) {
    super(scope, id, {
      ...props,
      removalPolicy: undefined,
      timeout: props.stackTimeout
    });
    const { hostedZone, certificate } = new CoreConstruct(this, 'CoreConstruct', props);
    this.certificate = certificate;
    this.hostedZone = hostedZone;
  }
}
