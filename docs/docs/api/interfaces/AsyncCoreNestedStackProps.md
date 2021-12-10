---
id: "AsyncCoreNestedStackProps"
title: "Interface: AsyncCoreNestedStackProps"
sidebar_label: "AsyncCoreNestedStackProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`CoreNestedStackProps`](CoreNestedStackProps)

  ↳ **`AsyncCoreNestedStackProps`**

## Properties

### certificateArn

• `Optional` **certificateArn**: `string`

Option to use an existing certificate for TLS/SSL

#### Inherited from

[CoreNestedStackProps](CoreNestedStackProps).[certificateArn](CoreNestedStackProps#certificatearn)

#### Defined in

[src/stacks/core/CoreConstruct.ts:44](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/core/CoreConstruct.ts#L44)

___

### comment

• `Optional` `Readonly` **comment**: `string`

Any comments that you want to include about the hosted zone.

**`default`** none

**`stability`** stable

#### Inherited from

[CoreNestedStackProps](CoreNestedStackProps).[comment](CoreNestedStackProps#comment)

#### Defined in

node_modules/@aws-cdk/aws-route53/lib/hosted-zone.d.ts:29

___

### dontOverrideLogicalId

• `Optional` **dontOverrideLogicalId**: false \| true

Option to not use fixed logicalId's for the RestApi resource. For more
info, see [Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Inherited from

[CoreNestedStackProps](CoreNestedStackProps).[dontOverrideLogicalId](CoreNestedStackProps#dontoverridelogicalid)

#### Defined in

[src/stacks/core/CoreConstruct.ts:50](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/core/CoreConstruct.ts#L50)

___

### env

• **env**: `Required`<`Environment`\>

#### Defined in

[src/stacks/core/CoreNestedStack.ts:14](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/core/CoreNestedStack.ts#L14)

___

### hostedZoneId

• `Optional` **hostedZoneId**: `string`

When adding records to an existing HostedZone, pass in the hostedZoneId
and records for all the other stacks will get added to the targeted zone

#### Inherited from

[CoreNestedStackProps](CoreNestedStackProps).[hostedZoneId](CoreNestedStackProps#hostedzoneid)

#### Defined in

[src/stacks/core/CoreConstruct.ts:19](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/core/CoreConstruct.ts#L19)

___

### includeSubdomains

• `Optional` **includeSubdomains**: false \| true

When building the certificate this will add a wildcard subDomain to
the rootDomain so that all subDomains will be able to use the
certificate.  If you would like to specify which subDomains should be
included use the `props.subjectAlternativeNames` instead.  When
passing in the certificateArn a certificate will not be created and
this will be ignored.

#### Inherited from

[CoreNestedStackProps](CoreNestedStackProps).[includeSubdomains](CoreNestedStackProps#includesubdomains)

#### Defined in

[src/stacks/core/CoreConstruct.ts:39](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/core/CoreConstruct.ts#L39)

___

### notificationArns

• `Optional` `Readonly` **notificationArns**: `string`[]

The Simple Notification Service (SNS) topics to publish stack related events.

**`default`** - notifications are not sent for this stack.

**`stability`** stable

#### Inherited from

[CoreNestedStackProps](CoreNestedStackProps).[notificationArns](CoreNestedStackProps#notificationarns)

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

[CoreNestedStackProps](CoreNestedStackProps).[parameters](CoreNestedStackProps#parameters)

#### Defined in

node_modules/@aws-cdk/core/lib/nested-stack.d.ts:25

___

### profile

• **profile**: `string`

#### Defined in

[src/stacks/core/CoreNestedStack.ts:13](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/core/CoreNestedStack.ts#L13)

___

### queryLogsLogGroupArn

• `Optional` `Readonly` **queryLogsLogGroupArn**: `string`

The Amazon Resource Name (ARN) for the log group that you want Amazon Route 53 to send query logs to.

**`default`** disabled

**`stability`** stable

#### Inherited from

[CoreNestedStackProps](CoreNestedStackProps).[queryLogsLogGroupArn](CoreNestedStackProps#querylogsloggrouparn)

#### Defined in

node_modules/@aws-cdk/aws-route53/lib/hosted-zone.d.ts:36

___

### removalPolicy

• `Optional` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

RemovalPolicy to apply to all resources.  If a RemovalPolicy prop is provided
for a specific resource, ie the `props.userPool.removalPolicy`, it will
override this value

#### Inherited from

[CoreNestedStackProps](CoreNestedStackProps).[removalPolicy](CoreNestedStackProps#removalpolicy)

#### Defined in

[src/stacks/core/CoreConstruct.ts:57](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/core/CoreConstruct.ts#L57)

___

### rootDomain

• **rootDomain**: `string`

The url/rootDomain for the HostedZone

**`example`** If you are hosting the ui at `www.example.com` and the api
at `api.example.com` the rootDomain would be `example.com`  This is
similar for branches, such as `dev.api.example.com` and
`dev.example.com`.  The rootDomain will still be `example.com`.

#### Inherited from

[CoreNestedStackProps](CoreNestedStackProps).[rootDomain](CoreNestedStackProps#rootdomain)

#### Defined in

[src/stacks/core/CoreConstruct.ts:29](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/core/CoreConstruct.ts#L29)

___

### stackTimeout

• `Optional` **stackTimeout**: `Duration`

#### Inherited from

[CoreNestedStackProps](CoreNestedStackProps).[stackTimeout](CoreNestedStackProps#stacktimeout)

#### Defined in

[src/stacks/core/CoreNestedStack.ts:10](https://github.com/matthewkeil/full-stack-pattern/blob/cd5f871/src/stacks/core/CoreNestedStack.ts#L10)

___

### subjectAlternativeNames

• `Optional` `Readonly` **subjectAlternativeNames**: `string`[]

Alternative domain names on your certificate.

Use this to register alternative domain names that represent the same site.

**`default`** - No additional FQDNs will be included as alternative domain names.

**`stability`** stable

#### Inherited from

[CoreNestedStackProps](CoreNestedStackProps).[subjectAlternativeNames](CoreNestedStackProps#subjectalternativenames)

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

[CoreNestedStackProps](CoreNestedStackProps).[validationDomains](CoreNestedStackProps#validationdomains)

#### Defined in

node_modules/@aws-cdk/aws-certificatemanager/lib/certificate.d.ts:61

___

### validationMethod

• `Optional` `Readonly` **validationMethod**: `EMAIL` \| `DNS`

(deprecated) Validation method used to assert domain ownership.

**`default`** ValidationMethod.EMAIL

**`deprecated`** use `validation` instead.

#### Inherited from

[CoreNestedStackProps](CoreNestedStackProps).[validationMethod](CoreNestedStackProps#validationmethod)

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

[CoreNestedStackProps](CoreNestedStackProps).[vpcs](CoreNestedStackProps#vpcs)

#### Defined in

node_modules/@aws-cdk/aws-route53/lib/hosted-zone.d.ts:55
