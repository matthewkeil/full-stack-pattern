---
id: "FullStackProps"
title: "Interface: FullStackProps"
sidebar_label: "FullStackProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Omit`<[`FullStackConstructProps`](FullStackConstructProps), ``"nested"`` \| ``"stackTimeout"``\>

- `StackProps`

  ↳ **`FullStackProps`**

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

### auth

• `Optional` **auth**: `Pick`<[`CognitoConstructProps`](CognitoConstructProps), ``"users"`` \| ``"groups"`` \| ``"removalPolicy"`` \| ``"dontOverrideLogicalId"`` \| ``"userPool"`` \| ``"userPoolId"`` \| ``"userPoolClientId"`` \| ``"userPoolClient"`` \| ``"userPoolDomain"`` \| ``"identityPool"`` \| ``"authenticatedRole"`` \| ``"authenticatedPolicyStatements"`` \| ``"css"``\> & { `loginCallbackPath?`: `string` ; `logoutCallbackPath?`: `string`  }

#### Inherited from

Omit.auth

#### Defined in

[src/patterns/FullStackConstruct.ts:59](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/patterns/FullStackConstruct.ts#L59)

___

### core

• `Optional` **core**: `Pick`<[`CoreConstructProps`](CoreConstructProps), ``"prefix"`` \| ``"removalPolicy"`` \| ``"dontOverrideLogicalId"`` \| ``"vpcs"`` \| ``"comment"`` \| ``"queryLogsLogGroupArn"`` \| ``"subjectAlternativeNames"`` \| ``"validationDomains"`` \| ``"validationMethod"`` \| ``"hostedZoneId"`` \| ``"includeSubdomains"`` \| ``"certificateArn"``\>

#### Inherited from

Omit.core

#### Defined in

[src/patterns/FullStackConstruct.ts:55](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/patterns/FullStackConstruct.ts#L55)

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

#### Inherited from

Omit.env

#### Defined in

[src/patterns/FullStackConstruct.ts:28](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/patterns/FullStackConstruct.ts#L28)

___

### frontend

• **frontend**: `Pick`<[`CDNConstructProps`](CDNConstructProps), ``"bucketName"`` \| ``"removalPolicy"`` \| ``"dontOverrideLogicalId"`` \| ``"api"`` \| ``"codePaths"`` \| ``"useExistingBucket"`` \| ``"noBucketPolicy"`` \| ``"buildWwwSubdomain"`` \| ``"hostedZone"`` \| ``"certificate"`` \| ``"bucketProps"`` \| ``"deploymentRole"``\>

#### Inherited from

Omit.frontend

#### Defined in

[src/patterns/FullStackConstruct.ts:56](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/patterns/FullStackConstruct.ts#L56)

___

### prefix

• **prefix**: `string`

**`description`** A prefix that will be used for all resource names.  In an effort to
prevent resource collisions and promote stack stability across application and
cdk construct life cycles. Best practice for this is to use a tiered approach. A
process that has worked very well across teams and accounts is:

const prefix =`${client}-${project}-${stage}`;

Clients tend to do more than one line of business with a good contractor.  The
project represents the LOB or other short descriptor.  So in the dev account of
"best-client-ever" the project might be "fullstack-sales-plat"

**`example`**

#### Inherited from

Omit.prefix

#### Defined in

[src/patterns/FullStackConstruct.ts:43](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/patterns/FullStackConstruct.ts#L43)

___

### removalPolicy

• `Optional` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

#### Inherited from

Omit.removalPolicy

#### Defined in

[src/patterns/FullStackConstruct.ts:51](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/patterns/FullStackConstruct.ts#L51)

___

### rootDomain

• **rootDomain**: `string`

#### Inherited from

Omit.rootDomain

#### Defined in

[src/patterns/FullStackConstruct.ts:45](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/patterns/FullStackConstruct.ts#L45)

___

### serverless

• **serverless**: `Pick`<`Pick`<[`ServerlessConstructProps`](ServerlessConstructProps), ``"binaryMediaTypes"`` \| ``"minimumCompressionSize"`` \| ``"cloneFrom"`` \| ``"apiKeySourceType"`` \| ``"endpointConfiguration"`` \| ``"deploy"`` \| ``"deployOptions"`` \| ``"retainDeployments"`` \| ``"parameters"`` \| ``"policy"`` \| ``"failOnWarnings"`` \| ``"domainName"`` \| ``"cloudWatchRole"`` \| ``"endpointExportName"`` \| ``"endpointTypes"`` \| ``"disableExecuteApiEndpoint"`` \| ``"defaultIntegration"`` \| ``"defaultMethodOptions"`` \| ``"defaultCorsPreflightOptions"`` \| ``"role"`` \| ``"code"`` \| ``"events"`` \| ``"layers"`` \| ``"runtime"`` \| ``"timeout"`` \| ``"environment"`` \| ``"memorySize"`` \| ``"initialPolicy"`` \| ``"vpc"`` \| ``"vpcSubnets"`` \| ``"securityGroup"`` \| ``"securityGroups"`` \| ``"allowAllOutbound"`` \| ``"deadLetterQueueEnabled"`` \| ``"deadLetterQueue"`` \| ``"tracing"`` \| ``"profiling"`` \| ``"profilingGroup"`` \| ``"insightsVersion"`` \| ``"reservedConcurrentExecutions"`` \| ``"logRetention"`` \| ``"logRetentionRole"`` \| ``"logRetentionRetryOptions"`` \| ``"currentVersionOptions"`` \| ``"filesystem"`` \| ``"allowPublicSubnet"`` \| ``"environmentEncryption"`` \| ``"codeSigningConfig"`` \| ``"architectures"`` \| ``"architecture"`` \| ``"onFailure"`` \| ``"onSuccess"`` \| ``"maxEventAge"`` \| ``"retryAttempts"`` \| ``"externalId"`` \| ``"externalIds"`` \| ``"managedPolicies"`` \| ``"inlinePolicies"`` \| ``"path"`` \| ``"permissionsBoundary"`` \| ``"maxSessionDuration"`` \| ``"users"`` \| ``"groups"`` \| ``"statements"`` \| ``"force"`` \| ``"document"`` \| ``"encryptionKey"`` \| ``"retention"`` \| ``"removalPolicy"`` \| ``"table"`` \| ``"tables"`` \| ``"tableEnvKey"`` \| ``"name"`` \| ``"dontOverrideLogicalId"`` \| ``"canInvoke"`` \| ``"warmingEvent"`` \| ``"loggingLevel"`` \| ``"api"`` \| ``"existingLogGroups"`` \| ``"lambdas"`` \| ``"logicalId"`` \| ``"kinesisStream"`` \| ``"readCapacity"`` \| ``"writeCapacity"`` \| ``"billingMode"`` \| ``"pointInTimeRecovery"`` \| ``"serverSideEncryption"`` \| ``"encryption"`` \| ``"timeToLiveAttribute"`` \| ``"stream"`` \| ``"replicationRegions"`` \| ``"replicationTimeout"`` \| ``"waitForReplicationToFinish"`` \| ``"contributorInsightsEnabled"`` \| ``"userPool"`` \| ``"gatewayResponses"`` \| ``"buildDevServer"``\>, ``"binaryMediaTypes"`` \| ``"minimumCompressionSize"`` \| ``"cloneFrom"`` \| ``"apiKeySourceType"`` \| ``"endpointConfiguration"`` \| ``"deploy"`` \| ``"deployOptions"`` \| ``"retainDeployments"`` \| ``"parameters"`` \| ``"policy"`` \| ``"failOnWarnings"`` \| ``"domainName"`` \| ``"cloudWatchRole"`` \| ``"endpointExportName"`` \| ``"endpointTypes"`` \| ``"disableExecuteApiEndpoint"`` \| ``"defaultIntegration"`` \| ``"defaultMethodOptions"`` \| ``"defaultCorsPreflightOptions"`` \| ``"role"`` \| ``"code"`` \| ``"events"`` \| ``"layers"`` \| ``"runtime"`` \| ``"timeout"`` \| ``"environment"`` \| ``"memorySize"`` \| ``"initialPolicy"`` \| ``"vpc"`` \| ``"vpcSubnets"`` \| ``"securityGroup"`` \| ``"securityGroups"`` \| ``"allowAllOutbound"`` \| ``"deadLetterQueueEnabled"`` \| ``"deadLetterQueue"`` \| ``"tracing"`` \| ``"profiling"`` \| ``"profilingGroup"`` \| ``"insightsVersion"`` \| ``"reservedConcurrentExecutions"`` \| ``"logRetention"`` \| ``"logRetentionRole"`` \| ``"logRetentionRetryOptions"`` \| ``"currentVersionOptions"`` \| ``"filesystem"`` \| ``"allowPublicSubnet"`` \| ``"environmentEncryption"`` \| ``"codeSigningConfig"`` \| ``"architectures"`` \| ``"architecture"`` \| ``"onFailure"`` \| ``"onSuccess"`` \| ``"maxEventAge"`` \| ``"retryAttempts"`` \| ``"externalId"`` \| ``"externalIds"`` \| ``"managedPolicies"`` \| ``"inlinePolicies"`` \| ``"path"`` \| ``"permissionsBoundary"`` \| ``"maxSessionDuration"`` \| ``"users"`` \| ``"groups"`` \| ``"statements"`` \| ``"force"`` \| ``"document"`` \| ``"encryptionKey"`` \| ``"retention"`` \| ``"removalPolicy"`` \| ``"table"`` \| ``"tables"`` \| ``"tableEnvKey"`` \| ``"name"`` \| ``"dontOverrideLogicalId"`` \| ``"canInvoke"`` \| ``"warmingEvent"`` \| ``"loggingLevel"`` \| ``"api"`` \| ``"lambdas"`` \| ``"logicalId"`` \| ``"kinesisStream"`` \| ``"readCapacity"`` \| ``"writeCapacity"`` \| ``"billingMode"`` \| ``"pointInTimeRecovery"`` \| ``"serverSideEncryption"`` \| ``"encryption"`` \| ``"timeToLiveAttribute"`` \| ``"stream"`` \| ``"replicationRegions"`` \| ``"replicationTimeout"`` \| ``"waitForReplicationToFinish"`` \| ``"contributorInsightsEnabled"`` \| ``"userPool"`` \| ``"gatewayResponses"`` \| ``"buildDevServer"``\>

#### Inherited from

Omit.serverless

#### Defined in

[src/patterns/FullStackConstruct.ts:57](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/patterns/FullStackConstruct.ts#L57)

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

### stage

• **stage**: `string`

#### Inherited from

Omit.stage

#### Defined in

[src/patterns/FullStackConstruct.ts:44](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/patterns/FullStackConstruct.ts#L44)

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

### uiDevPort

• `Optional` **uiDevPort**: `string` \| `number`

#### Inherited from

Omit.uiDevPort

#### Defined in

[src/patterns/FullStackConstruct.ts:53](https://github.com/matthewkeil/full-stack-pattern/blob/ee83838/src/patterns/FullStackConstruct.ts#L53)
