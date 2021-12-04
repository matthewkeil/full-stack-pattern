import { Construct, RemovalPolicy } from '@aws-cdk/core';
import { CfnHostedZone, HostedZone, HostedZoneProps, IHostedZone } from '@aws-cdk/aws-route53';
import {
  Certificate,
  CertificateProps,
  CertificateValidation,
  CfnCertificate,
  ICertificate
} from '@aws-cdk/aws-certificatemanager';

export interface CoreConstructProps
  extends Partial<Omit<HostedZoneProps, 'zoneName'>>,
    Partial<Omit<CertificateProps, 'domainName'>> {
  rootDomain: string;
  includeSubdomains?: boolean;
  hostedZoneId?: string;
  certificateArn?: string;
  removalPolicy?: RemovalPolicy;
}

export class CoreConstruct extends Construct {
  public hostedZone: IHostedZone;
  public certificate: ICertificate;

  constructor(scope: Construct, id: string, props: CoreConstructProps) {
    super(scope, id);

    this.hostedZone = props.hostedZoneId
      ? HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
          hostedZoneId: props.hostedZoneId,
          zoneName: props.rootDomain
        })
      : new HostedZone(this, 'HostedZone', {
          ...props,
          zoneName: props.rootDomain
        });
    (this.hostedZone.node.defaultChild as CfnHostedZone).applyRemovalPolicy(props.removalPolicy);

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
    (this.certificate.node.defaultChild as CfnCertificate).applyRemovalPolicy(props.removalPolicy);
  }
}
