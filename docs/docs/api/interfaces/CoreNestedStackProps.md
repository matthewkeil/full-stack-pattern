---
id: "CoreNestedStackProps"
title: "Interface: CoreNestedStackProps"
sidebar_label: "CoreNestedStackProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Omit`<`NestedStackProps`, ``"removalPolicy"`` \| ``"timeout"``\>

- [`CoreConstructProps`](CoreConstructProps)

  ↳ **`CoreNestedStackProps`**

  ↳↳ [`AsyncCoreNestedStackProps`](AsyncCoreNestedStackProps)

## Properties

### certificateArn

• `Optional` **certificateArn**: `string`

#### Inherited from

[CoreConstructProps](CoreConstructProps).[certificateArn](CoreConstructProps#certificatearn)

#### Defined in

[src/stacks/core/CoreConstruct.ts:17](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/core/CoreConstruct.ts#L17)

___

### comment

• `Optional` `Readonly` **comment**: `string`

Any comments that you want to include about the hosted zone.

**`default`** none

**`stability`** stable

#### Inherited from

[CoreConstructProps](CoreConstructProps).[comment](CoreConstructProps#comment)

#### Defined in

node_modules/@aws-cdk/aws-route53/lib/hosted-zone.d.ts:29

___

### hostedZoneId

• `Optional` **hostedZoneId**: `string`

#### Inherited from

[CoreConstructProps](CoreConstructProps).[hostedZoneId](CoreConstructProps#hostedzoneid)

#### Defined in

[src/stacks/core/CoreConstruct.ts:16](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/core/CoreConstruct.ts#L16)

___

### includeSubdomains

• `Optional` **includeSubdomains**: false \| true

#### Inherited from

[CoreConstructProps](CoreConstructProps).[includeSubdomains](CoreConstructProps#includesubdomains)

#### Defined in

[src/stacks/core/CoreConstruct.ts:15](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/core/CoreConstruct.ts#L15)

___

### notificationArns

• `Optional` `Readonly` **notificationArns**: `string`[]

The Simple Notification Service (SNS) topics to publish stack related events.

**`default`** - notifications are not sent for this stack.

**`stability`** stable

#### Inherited from

Omit.notificationArns

#### Defined in

node_modules/@aws-cdk/core/lib/nested-stack.d.ts:48

___

### parameters

• `Optional` `Readonly` **parameters**: `Object`

The set value pairs that represent the parameters passed to CloudFormation when this nested stack is created.

Each parameter has a name corresponding
to a parameter defined in the embedded template and a value representing
the value that you want to set for the parameter.

The nested stack construct will automatically synthesize parameters in order
to bind references from the parent stack(s) into the nested stack.

**`default`** - no user-defined parameters are passed to the nested stack

**`stability`** stable

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

Omit.parameters

#### Defined in

node_modules/@aws-cdk/core/lib/nested-stack.d.ts:25

___

### queryLogsLogGroupArn

• `Optional` `Readonly` **queryLogsLogGroupArn**: `string`

The Amazon Resource Name (ARN) for the log group that you want Amazon Route 53 to send query logs to.

**`default`** disabled

**`stability`** stable

#### Inherited from

[CoreConstructProps](CoreConstructProps).[queryLogsLogGroupArn](CoreConstructProps#querylogsloggrouparn)

#### Defined in

node_modules/@aws-cdk/aws-route53/lib/hosted-zone.d.ts:36

___

### removalPolicy

• `Optional` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

#### Inherited from

[CoreConstructProps](CoreConstructProps).[removalPolicy](CoreConstructProps#removalpolicy)

#### Defined in

[src/stacks/core/CoreConstruct.ts:18](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/core/CoreConstruct.ts#L18)

___

### rootDomain

• **rootDomain**: `string`

#### Inherited from

[CoreConstructProps](CoreConstructProps).[rootDomain](CoreConstructProps#rootdomain)

#### Defined in

[src/stacks/core/CoreConstruct.ts:14](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/core/CoreConstruct.ts#L14)

___

### stackTimeout

• `Optional` **stackTimeout**: `Duration`

#### Defined in

[src/stacks/core/CoreNestedStack.ts:10](https://github.com/matthewkeil/full-stack-pattern/blob/2a38eee/src/stacks/core/CoreNestedStack.ts#L10)

___

### subjectAlternativeNames

• `Optional` `Readonly` **subjectAlternativeNames**: `string`[]

Alternative domain names on your certificate.

Use this to register alternative domain names that represent the same site.

**`default`** - No additional FQDNs will be included as alternative domain names.

**`stability`** stable

#### Inherited from

[CoreConstructProps](CoreConstructProps).[subjectAlternativeNames](CoreConstructProps#subjectalternativenames)

#### Defined in

node_modules/@aws-cdk/aws-certificatemanager/lib/certificate.d.ts:52

___

### validation

• `Optional` `Readonly` **validation**: `CertificateValidation`

How to validate this certificate.

**`default`** CertificateValidation.fromEmail()

**`stability`** stable

#### Inherited from

[CoreConstructProps](CoreConstructProps).[validation](CoreConstructProps#validation)

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

[CoreConstructProps](CoreConstructProps).[validationDomains](CoreConstructProps#validationdomains)

#### Defined in

node_modules/@aws-cdk/aws-certificatemanager/lib/certificate.d.ts:61

___

### validationMethod

• `Optional` `Readonly` **validationMethod**: `EMAIL` \| `DNS`

(deprecated) Validation method used to assert domain ownership.

**`default`** ValidationMethod.EMAIL

**`deprecated`** use `validation` instead.

#### Inherited from

[CoreConstructProps](CoreConstructProps).[validationMethod](CoreConstructProps#validationmethod)

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

[CoreConstructProps](CoreConstructProps).[vpcs](CoreConstructProps#vpcs)

#### Defined in

node_modules/@aws-cdk/aws-route53/lib/hosted-zone.d.ts:55
