import { Construct, RemovalPolicy, CfnOutput, Fn } from '@aws-cdk/core';
import { CfnHostedZone, HostedZone, HostedZoneProps, IHostedZone } from '@aws-cdk/aws-route53';
import {
  Certificate,
  CertificateProps,
  CertificateValidation,
  CfnCertificate,
  ICertificate
} from '@aws-cdk/aws-certificatemanager';

import { getCertArnForDomain } from '../../../lib/aws/certificateManager';
import { getHostedZoneIdForDomain } from '../../../lib/aws/route53';
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
   * Optional: A url subDomain to host the application at. Will still use the
   * HostedZone at rootDomain but all of this application will be hosted at
   * the subDomain
   *
   * Assume your HostedZone is at `rootDomain: "example.com"` and you want to
   * host at `subDomain: "best-app"`
   *
   * This subDomain is the new "default" root of the application
   * - the UI will be at `best-app.example.com` and the
   *   dev branch will be at `dev.best-app.example.com`.
   *   Optionally you can build `www.best-app.example.com`
   *
   * - The Api will be at
   *   `api.best-app.example.com` and the dev api will be at
   *   `dev.api.best-app.example.com`
   */
  subDomain?: string;

  /**
   * When building the certificate this will add a wildcard subDomain to
   * the rootDomain so that all subDomains will be able to use the
   * certificate.  If you would like to specify which subDomains should be
   * included use the `props.subjectAlternativeNames` instead.  When
   * passing in the certificateArn a certificate will not be created and
   * this will be ignored.
   */
  includeStarSubdomain?: boolean;

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
  public static getBaseDomain(props: { rootDomain: string; subDomain?: string }): string {
    return props.subDomain ? `${props.subDomain}.${props.rootDomain}` : props.rootDomain;
  }

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
      const baseDomain = CoreConstruct.getBaseDomain(props);
      _props.certificateArn = await getCertArnForDomain({
        profile: props.profile,
        baseDomain: baseDomain,
        region: props.region
      });
      if (_props.certificateArn) {
        console.log(`Found certificate for ${props.rootDomain}, using ${_props.certificateArn}`);
      }
    }

    if (!props.hostedZoneId) {
      _props.hostedZoneId = await getHostedZoneIdForDomain({
        profile: props.profile,
        rootDomain: props.rootDomain,
        region: props.region
      });
      if (_props.hostedZoneId) {
        console.log(`Found hostedZone for ${props.rootDomain}, using ${_props.hostedZoneId}`);
      }
    }

    return _props;
  }

  public hostedZone: IHostedZone;
  public certificate: ICertificate;
  public baseDomain: string;

  constructor(scope: Construct, id: string, private props: CoreConstructProps) {
    super(scope, id);
    this.hostedZone = this.buildHostedZone(this.props.rootDomain);
    this.baseDomain = CoreConstruct.getBaseDomain(this.props);
    this.certificate = this.buildCertificate(this.baseDomain);
  }

  private buildHostedZone(zoneName: string) {
    let hostedZone: IHostedZone;

    if (this.props.hostedZoneId) {
      hostedZone = HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
        hostedZoneId: this.props.hostedZoneId,
        zoneName
      });
    } else {
      hostedZone = new HostedZone(this, 'HostedZone', {
        ...this.props,
        zoneName
      });

      (hostedZone.node.defaultChild as CfnHostedZone).applyRemovalPolicy(this.props.removalPolicy);
      if (!this.props.dontOverrideLogicalId) {
        (hostedZone.node.defaultChild as CfnHostedZone).overrideLogicalId('HostedZone');
      }
      new CfnOutput(this, 'NameServers', {
        value: hostedZone.hostedZoneNameServers
          ? Fn.join(', ', hostedZone.hostedZoneNameServers)
          : 'private hosted zone'
      });
    }

    new CfnOutput(this, 'HostedZoneId', {
      value: hostedZone.hostedZoneId
    });

    return hostedZone;
  }

  private buildCertificate(baseDomain: string) {
    let certificate: ICertificate;

    if (this.props.certificateArn) {
      certificate = Certificate.fromCertificateArn(this, 'Certificate', this.props.certificateArn);
    } else {
      const subjectAlternativeNames = this.props.subjectAlternativeNames ?? [];
      
      if (this.props.includeStarSubdomain ?? true) {
        subjectAlternativeNames.push(`*.${baseDomain}`);
      }

      certificate = new Certificate(this, 'Certificate', {
        ...this.props,
        domainName: baseDomain,
        subjectAlternativeNames,
        validation: CertificateValidation.fromDns(this.hostedZone)
      });

      (certificate.node.defaultChild as CfnCertificate).applyRemovalPolicy(
        this.props.removalPolicy
      );
      if (!this.props.dontOverrideLogicalId) {
        (certificate.node.defaultChild as CfnCertificate).overrideLogicalId('Certificate');
      }
    }

    new CfnOutput(this, 'CertificateArn', {
      value: certificate.certificateArn
    });

    return certificate;
  }
}
