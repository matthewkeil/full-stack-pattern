---
id: "CoreStackProps"
title: "Interface: CoreStackProps"
sidebar_label: "CoreStackProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `StackProps`

- [`CoreConstructProps`](CoreConstructProps)

  ↳ **`CoreStackProps`**

  ↳↳ [`AsyncCoreStackProps`](AsyncCoreStackProps)

## Properties

### analyticsReporting

• `Optional` `Readonly` **analyticsReporting**: false \| true

Include runtime versioning information in this Stack.

**`default`** `analyticsReporting` setting of containing `App`, or value of
'aws:cdk:version-reporting' context key

**`stability`** stable

#### Inherited from

StackProps.analyticsReporting

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:126

___

### certificateArn

• `Optional` **certificateArn**: `string`

#### Inherited from

[CoreConstructProps](CoreConstructProps).[certificateArn](CoreConstructProps#certificatearn)

#### Defined in

[src/stacks/core/CoreConstruct.ts:17](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/stacks/core/CoreConstruct.ts#L17)

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

### description

• `Optional` `Readonly` **description**: `string`

A description of the stack.

**`default`** - No description.

**`stability`** stable

#### Inherited from

StackProps.description

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:22

___

### env

• `Optional` `Readonly` **env**: `Environment`

The AWS environment (account/region) where this stack will be deployed.

Set the `region`/`account` fields of `env` to either a concrete value to
select the indicated environment (recommended for production stacks), or to
the values of environment variables
`CDK_DEFAULT_REGION`/`CDK_DEFAULT_ACCOUNT` to let the target environment
depend on the AWS credentials/configuration that the CDK CLI is executed
under (recommended for development stacks).

If the `Stack` is instantiated inside a `Stage`, any undefined
`region`/`account` fields from `env` will default to the same field on the
encompassing `Stage`, if configured there.

If either `region` or `account` are not set nor inherited from `Stage`, the
Stack will be considered "*environment-agnostic*"". Environment-agnostic
stacks can be deployed to any environment but may not be able to take
advantage of all features of the CDK. For example, they will not be able to
use environmental context lookups such as `ec2.Vpc.fromLookup` and will not
automatically translate Service Principals to the right format based on the
environment's AWS partition, and other such enhancements.

**`default`** - The environment of the containing `Stage` if available,
otherwise create the stack will be environment-agnostic.

**`stability`** stable

**`example`**

// Use a concrete account and region to deploy this stack to:
// `.account` and `.region` will simply return these values.
new Stack(app, 'Stack1', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  },
});

// Use the CLI's current credentials to determine the target environment:
// `.account` and `.region` will reflect the account+region the CLI
// is configured to use (based on the user CLI credentials)
new Stack(app, 'Stack2', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
});

// Define multiple stacks stage associated with an environment
const myStage = new Stage(app, 'MyStage', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  }
});

// both of these stacks will use the stage's account/region:
// `.account` and `.region` will resolve to the concrete values as above
new MyStack(myStage, 'Stack1');
new YourStack(myStage, 'Stack2');

// Define an environment-agnostic stack:
// `.account` and `.region` will resolve to `{ "Ref": "AWS::AccountId" }` and `{ "Ref": "AWS::Region" }` respectively.
// which will only resolve to actual values by CloudFormation during deployment.
new MyStack(app, 'Stack1');

#### Inherited from

StackProps.env

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:87

___

### hostedZoneId

• `Optional` **hostedZoneId**: `string`

#### Inherited from

[CoreConstructProps](CoreConstructProps).[hostedZoneId](CoreConstructProps#hostedzoneid)

#### Defined in

[src/stacks/core/CoreConstruct.ts:16](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/stacks/core/CoreConstruct.ts#L16)

___

### includeSubdomains

• `Optional` **includeSubdomains**: false \| true

#### Inherited from

[CoreConstructProps](CoreConstructProps).[includeSubdomains](CoreConstructProps#includesubdomains)

#### Defined in

[src/stacks/core/CoreConstruct.ts:15](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/stacks/core/CoreConstruct.ts#L15)

___

### prefix

• **prefix**: `string`

#### Defined in

[src/stacks/core/CoreStack.ts:8](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/stacks/core/CoreStack.ts#L8)

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

[src/stacks/core/CoreConstruct.ts:18](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/stacks/core/CoreConstruct.ts#L18)

___

### rootDomain

• **rootDomain**: `string`

#### Inherited from

[CoreConstructProps](CoreConstructProps).[rootDomain](CoreConstructProps#rootdomain)

#### Defined in

[src/stacks/core/CoreConstruct.ts:14](https://github.com/matthewkeil/full-stack-pattern/blob/ab0b703/src/stacks/core/CoreConstruct.ts#L14)

___

### stackName

• `Optional` `Readonly` **stackName**: `string`

Name to deploy the stack with.

**`default`** - Derived from construct path.

**`stability`** stable

#### Inherited from

StackProps.stackName

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:94

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

### synthesizer

• `Optional` `Readonly` **synthesizer**: `IStackSynthesizer`

Synthesis method to use while deploying this stack.

**`default`** - `DefaultStackSynthesizer` if the `@aws-cdk/core:newStyleStackSynthesis` feature flag
is set, `LegacyStackSynthesizer` otherwise.

**`stability`** stable

#### Inherited from

StackProps.synthesizer

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:111

___

### tags

• `Optional` `Readonly` **tags**: `Object`

Stack tags that will be applied to all the taggable resources and the stack itself.

**`default`** {}

**`stability`** stable

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

StackProps.tags

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:101

___

### terminationProtection

• `Optional` `Readonly` **terminationProtection**: false \| true

Whether to enable termination protection for this stack.

**`default`** false

**`stability`** stable

#### Inherited from

StackProps.terminationProtection

#### Defined in

node_modules/@aws-cdk/core/lib/stack.d.ts:118

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
