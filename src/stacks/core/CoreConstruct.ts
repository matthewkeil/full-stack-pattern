import { HostedZone, HostedZoneProps, IHostedZone } from '@aws-cdk/aws-route53';
import {
  Certificate,
  CertificateProps,
  CertificateValidation,
  ICertificate
} from '@aws-cdk/aws-certificatemanager';
import { Construct } from '@aws-cdk/core';
import { BaseConstruct, BaseConstructProps } from '../../constructs/BaseConstruct';

export interface CoreConstructProps
  extends BaseConstructProps,
    Partial<HostedZoneProps>,
    Partial<Omit<CertificateProps, 'domainName'>> {
  rootDomain: string;
  includeSubdomains?: boolean;
  hostedZoneId?: string;
  certificateArn?: string;
}

export class CoreConstruct extends BaseConstruct {
  public hostedZone: IHostedZone;
  public certificate: ICertificate;

  constructor(scope: Construct, id: string, props: CoreConstructProps) {
    super(scope, id, props);

    this.hostedZone = props.hostedZoneId
      ? HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
        hostedZoneId: props.hostedZoneId,
        zoneName: props.rootDomain
      })
      : new HostedZone(this, 'HostedZone', {
        ...props,
        zoneName: props.rootDomain
      });

    const subjectAlternativeNames = props.subjectAlternativeNames ?? [];
    if (props.includeSubdomains) {
      subjectAlternativeNames.push(`*.${props.rootDomain}`);
    }

    this.certificate = props.certificateArn
      ? Certificate.fromCertificateArn(this, 'Certificate', props.certificateArn)
      : new Certificate(this, 'Certificate', {
        ...props,
        domainName: props.rootDomain,
        subjectAlternativeNames,
        validation: CertificateValidation.fromDns(this.hostedZone)
      });
  }
}
