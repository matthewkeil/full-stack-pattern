import { Construct, RemovalPolicy, CfnOutput } from '@aws-cdk/core';
import { CfnHostedZone, HostedZone, HostedZoneProps, IHostedZone } from '@aws-cdk/aws-route53';
import {
  Certificate,
  CertificateProps,
  CertificateValidation,
  CfnCertificate,
  ICertificate
} from '@aws-cdk/aws-certificatemanager';

import { getHostedZoneIdForDomain, getCertArnForDomain } from '../../../lib';
export interface CoreConstructProps
  extends Partial<Omit<HostedZoneProps, 'zoneName'>>,
    Partial<Omit<CertificateProps, 'domainName' | 'validation'>> {
  /**
   * When adding records to an existing HostedZone, pass in the hostedZoneId
   * and records for all the other stacks will get added to the targeted zone
   */
  hostedZoneId?: string;

  /**
   * The url/rootDomain for the HostedZone
   *
   * @example If you are hosting the ui at `www.example.com` and the api
   * at `api.example.com` the rootDomain would be `example.com`  This is
   * similar for branches, such as `dev.api.example.com` and
   * `dev.example.com`.  The rootDomain will still be `example.com`.
   */
  rootDomain: string;

  /**
   * When building the certificate this will add a wildcard subDomain to
   * the rootDomain so that all subDomains will be able to use the
   * certificate.  If you would like to specify which subDomains should be
   * included use the `props.subjectAlternativeNames` instead.  When
   * passing in the certificateArn a certificate will not be created and
   * this will be ignored.
   */
  includeSubdomains?: boolean;

  /**
   * Option to use an existing certificate for TLS/SSL
   */
  certificateArn?: string;

  /**
   * Option to not use fixed logicalId's for the RestApi resource. For more
   * info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   */
  dontOverrideLogicalId?: boolean;

  /**
   * RemovalPolicy to apply to all resources.  If a RemovalPolicy prop is provided
   * for a specific resource, ie the `props.userPool.removalPolicy`, it will
   * override this value
   */
  removalPolicy?: RemovalPolicy;
}

export class CoreConstruct extends Construct {
  /**
   * Will lookup the hostedZoneId and the certificateArn for the provided
   * rootDomain.  If a HostedZone is found for rootDomain the id is added
   * to props.hostedZoneId.  If a Certificate is found for the rootDomain
   * the certificateArn is added to props.certificateArn.  This makes it
   * easy to pass the returned props to the CoreConstruct constructor
   * function.
   *
   * Must provide a region to search and optionally can provide
   * a profile to use (uses profile/credentials in ~/.aws/credentials) for
   * the lookup
   *
   * @returns {Promise<CoreConstructProps>}
   */
  public static async lookupExistingResources(
    props: CoreConstructProps & { region: string; profile?: string }
  ): Promise<CoreConstructProps> {
    const _props = { ...props, region: undefined, profile: undefined };

    if (!props.certificateArn) {
      _props.certificateArn = await getCertArnForDomain({
        profile: props.profile,
        domain: props.rootDomain,
        region: props.region
      });
      console.log(`Found certificate for ${props.rootDomain}, using ${_props.certificateArn}`);
    }
    if (!props.hostedZoneId) {
      _props.hostedZoneId = await getHostedZoneIdForDomain({
        profile: props.profile,
        rootDomain: props.rootDomain,
        region: props.region
      });
      console.log(`Found hostedZone for ${props.rootDomain}, using ${_props.hostedZoneId}`);
    }
    return _props;
  }

  public hostedZone: IHostedZone;
  public certificate: ICertificate;

  constructor(scope: Construct, id: string, props: CoreConstructProps) {
    super(scope, id);

    if (props.hostedZoneId) {
      this.hostedZone = HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
        hostedZoneId: props.hostedZoneId,
        zoneName: props.rootDomain
      });
    } else {
      this.hostedZone = new HostedZone(this, 'HostedZone', {
        ...props,
        zoneName: props.rootDomain
      });
      (this.hostedZone.node.defaultChild as CfnHostedZone).applyRemovalPolicy(props.removalPolicy);
      if (!props.dontOverrideLogicalId) {
        (this.hostedZone.node.defaultChild as CfnHostedZone).overrideLogicalId('HostedZone');
      }
      new CfnOutput(this, 'NameServers', {
        value: this.hostedZone.hostedZoneNameServers?.join(', ') ?? 'private hosted zone'
      });
    }
    new CfnOutput(this, 'HostedZoneId', {
      value: this.hostedZone.hostedZoneId
    });
    
    if (props.certificateArn) {
      this.certificate = Certificate.fromCertificateArn(this, 'Certificate', props.certificateArn);
    } else {
      const subjectAlternativeNames = props.subjectAlternativeNames ?? [];
      if (props.includeSubdomains) {
        subjectAlternativeNames.push(`*.${props.rootDomain}`);
      }

      this.certificate = new Certificate(this, 'Certificate', {
        ...props,
        domainName: props.rootDomain,
        subjectAlternativeNames,
        validation: CertificateValidation.fromDns(this.hostedZone)
      });
      (this.certificate.node.defaultChild as CfnCertificate).applyRemovalPolicy(
        props.removalPolicy
      );
      if (!props.dontOverrideLogicalId) {
        (this.certificate.node.defaultChild as CfnCertificate).overrideLogicalId('Certificate');
      }
    }
    new CfnOutput(this, 'CertificateArn', {
      value: this.certificate.certificateArn
    });
  }
}
