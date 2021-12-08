---
sidebar_position: 1
---

# CoreConstruct

This construct takes care of building a HostedZone and a Certificate for you. It allows all of your content (ui, api, etc) to be served at your own domain name with up-to-date TLS/SSL. The certificate automatically renews, when it expires, and will automatically be validated using a text domain record.

Optionally its possible to pass in an existing HostedZoneId and CertificateId to use instead of creating a new one. This will plug into your existing DNS and SSL infrastructure.

If a HostedZone is created, the name servers will be on the stack outputs. To wire things up, all you need to do is enter those nameservers into your DNS provider and all other DNS management, for that zone, can be done through AWS.

#### Resource types that are deployed

- AWS::Route53::HostedZone
- AWS::CertificateManager::Certificate

## CoreConstructProps

```typescript
export interface CoreConstructProps
  extends Partial<Omit<HostedZoneProps, 'zoneName'>>,
    Partial<Omit<CertificateProps, 'domainName'>> {
  /**
   * The prefix to use with resource names. If `prefix` and `name` are
   * provided then the apiName will be `${prefix}-${name}`.  If no name
   * is provided then the apiName will be `prefix`. For more info, see
   * [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)
   */
  prefix?: string;

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
```

## Usage Example

```typescript
import { App, Stack, StackProps, Construct } from '@aws-cdk/core';
import { MxRecord } from '@aws-cdk/aws-route53';
import { CoreStack, CoreConstruct, CoreConstructProps } from 'full-stack-pattern';

interface DNSStackProps extends StackProps {
  core: CoreConstructProps;
}
class DNSStack extends Stack {
  constructor(scope: Construct, id: string, props: DNSStackProps) {
    const core = new CoreConstruct(this, 'Core', props.core);
    /**
     * Other DNS constructs go here, for example:
     */
    new MxRecord(this, 'MxRecord', {
      zone: this.hostedZone,
      recordName: props.core.rootDomain,
      values: [
        {
          priority: 10,
          hostName: props.core.rootDomain
        }
      ]
    });
  }
}

// These props will get passed through the call to
// CoreConstruct.lookupExistingResources()
const props: CoreConstructProps = {
  prefix: `${client}-${project}-${env}`,
  rootDomain: 'example.com',
  includeSubdomains: true
};

/**
 * public static lookupExistingResources()
 *
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
CoreConstruct.lookupExistingResources({
  region: 'us-east-1',
  profile: 'best-client',
  ...props
}).then(coreProps => {
  const app = new App();

  new DNSStack(app, 'Core', { core: coreProps });

  app.synth();
});
```
