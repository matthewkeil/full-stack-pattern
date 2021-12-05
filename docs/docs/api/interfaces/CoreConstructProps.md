---
id: "CoreConstructProps"
title: "Interface: CoreConstructProps"
sidebar_label: "CoreConstructProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Partial`<`Omit`<`HostedZoneProps`, ``"zoneName"``\>\>

- `Partial`<`Omit`<`CertificateProps`, ``"domainName"``\>\>

  ↳ **`CoreConstructProps`**

  ↳↳ [`CoreStackProps`](CoreStackProps)

  ↳↳ [`CoreNestedStackProps`](CoreNestedStackProps)

## Properties

### certificateArn

• `Optional` **certificateArn**: `string`

#### Defined in

[src/stacks/core/CoreConstruct.ts:17](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/stacks/core/CoreConstruct.ts#L17)

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

### hostedZoneId

• `Optional` **hostedZoneId**: `string`

#### Defined in

[src/stacks/core/CoreConstruct.ts:16](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/stacks/core/CoreConstruct.ts#L16)

___

### includeSubdomains

• `Optional` **includeSubdomains**: false \| true

#### Defined in

[src/stacks/core/CoreConstruct.ts:15](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/stacks/core/CoreConstruct.ts#L15)

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

#### Defined in

[src/stacks/core/CoreConstruct.ts:18](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/stacks/core/CoreConstruct.ts#L18)

___

### rootDomain

• **rootDomain**: `string`

#### Defined in

[src/stacks/core/CoreConstruct.ts:14](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/stacks/core/CoreConstruct.ts#L14)

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

### validation

• `Optional` `Readonly` **validation**: `CertificateValidation`

How to validate this certificate.

**`default`** CertificateValidation.fromEmail()

**`stability`** stable

#### Inherited from

Partial.validation

#### Defined in

node_modules/@aws-cdk/aws-certificatemanager/lib/certificate.d.ts:77

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
