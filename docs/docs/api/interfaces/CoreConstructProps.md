---
id: "CoreConstructProps"
title: "Interface: CoreConstructProps"
sidebar_label: "CoreConstructProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Partial`<`Omit`<`HostedZoneProps`, ``"zoneName"``\>\>

- `Partial`<`Omit`<`CertificateProps`, ``"domainName"`` \| ``"validation"``\>\>

  ↳ **`CoreConstructProps`**

  ↳↳ [`CoreStackProps`](CoreStackProps)

  ↳↳ [`CoreNestedStackProps`](CoreNestedStackProps)

## Properties

### certificateArn

• `Optional` **certificateArn**: `string`

Option to use an existing certificate for TLS/SSL

#### Defined in

[src/stacks/core/CoreConstruct.ts:44](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/core/CoreConstruct.ts#L44)

___

### comment

• `Optional` `Readonly` **comment**: `string`

Any comments that you want to include about the hosted zone.

**`default`** none

**`stability`** stable

#### Inherited from

Partial.comment

#### Defined in

node_modules/@aws-cdk/aws-route53/lib/hosted-zone.d.ts:29

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

Option to not use fixed logicalId's for the RestApi resource. For more
info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Defined in

[src/stacks/core/CoreConstruct.ts:50](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/core/CoreConstruct.ts#L50)

___

### hostedZoneId

• `Optional` **hostedZoneId**: `string`

When adding records to an existing HostedZone, pass in the hostedZoneId
and records for all the other stacks will get added to the targeted zone

#### Defined in

[src/stacks/core/CoreConstruct.ts:19](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/core/CoreConstruct.ts#L19)

___

### includeSubdomains

• `Optional` **includeSubdomains**: false \| true

When building the certificate this will add a wildcard subDomain to
the rootDomain so that all subDomains will be able to use the
certificate.  If you would like to specify which subDomains should be
included use the `props.subjectAlternativeNames` instead.  When
passing in the certificateArn a certificate will not be created and
this will be ignored.

#### Defined in

[src/stacks/core/CoreConstruct.ts:39](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/core/CoreConstruct.ts#L39)

___

### queryLogsLogGroupArn

• `Optional` `Readonly` **queryLogsLogGroupArn**: `string`

The Amazon Resource Name (ARN) for the log group that you want Amazon Route 53 to send query logs to.

**`default`** disabled

**`stability`** stable

#### Inherited from

Partial.queryLogsLogGroupArn

#### Defined in

node_modules/@aws-cdk/aws-route53/lib/hosted-zone.d.ts:36

___

### removalPolicy

• `Optional` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

RemovalPolicy to apply to all resources.  If a RemovalPolicy prop is provided
for a specific resource, ie the `props.userPool.removalPolicy`, it will
override this value

#### Defined in

[src/stacks/core/CoreConstruct.ts:57](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/core/CoreConstruct.ts#L57)

___

### rootDomain

• **rootDomain**: `string`

The url/rootDomain for the HostedZone

**`example`** If you are hosting the ui at `www.example.com` and the api
at `api.example.com` the rootDomain would be `example.com`  This is
similar for branches, such as `dev.api.example.com` and
`dev.example.com`.  The rootDomain will still be `example.com`.

#### Defined in

[src/stacks/core/CoreConstruct.ts:29](https://github.com/matthewkeil/full-stack-pattern/blob/47a3018/src/stacks/core/CoreConstruct.ts#L29)

___

### subjectAlternativeNames

• `Optional` `Readonly` **subjectAlternativeNames**: `string`[]

Alternative domain names on your certificate.

Use this to register alternative domain names that represent the same site.

**`default`** - No additional FQDNs will be included as alternative domain names.

**`stability`** stable

#### Inherited from

Partial.subjectAlternativeNames

#### Defined in

node_modules/@aws-cdk/aws-certificatemanager/lib/certificate.d.ts:52

___

### validationDomains

• `Optional` `Readonly` **validationDomains**: `Object`

(deprecated) What validation domain to use for every requested domain.

Has to be a superdomain of the requested domain.

**`default`** - Apex domain is used for every domain that's not overridden.

**`deprecated`** use `validation` instead.

#### Index signature

▪ [domainName: `string`]: `string`

#### Inherited from

Partial.validationDomains

#### Defined in

node_modules/@aws-cdk/aws-certificatemanager/lib/certificate.d.ts:61

___

### validationMethod

• `Optional` `Readonly` **validationMethod**: `EMAIL` \| `DNS`

(deprecated) Validation method used to assert domain ownership.

**`default`** ValidationMethod.EMAIL

**`deprecated`** use `validation` instead.

#### Inherited from

Partial.validationMethod

#### Defined in

node_modules/@aws-cdk/aws-certificatemanager/lib/certificate.d.ts:70

___

### vpcs

• `Optional` `Readonly` **vpcs**: `IVpc`[]

A VPC that you want to associate with this hosted zone.

When you specify
this property, a private hosted zone will be created.

You can associate additional VPCs to this private zone using `addVpc(vpc)`.

**`default`** public (no VPCs associated)

**`stability`** stable

#### Inherited from

Partial.vpcs

#### Defined in

node_modules/@aws-cdk/aws-route53/lib/hosted-zone.d.ts:55
