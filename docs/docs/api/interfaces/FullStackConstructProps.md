---
id: "FullStackConstructProps"
title: "Interface: FullStackConstructProps"
sidebar_label: "FullStackConstructProps"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`FullStackConstructProps`**

  ↳ [`FullStackProps`](FullStackProps)

## Properties

### auth

• `Optional` **auth**: `Pick`<[`CognitoConstructProps`](CognitoConstructProps), ``"groups"`` \| ``"removalPolicy"`` \| ``"dontOverrideLogicalId"`` \| ``"userPool"`` \| ``"userPoolId"`` \| ``"userPoolClientId"`` \| ``"userPoolClient"`` \| ``"userPoolDomain"`` \| ``"identityPool"`` \| ``"authenticatedRole"`` \| ``"authenticatedPolicyStatements"`` \| ``"css"``\> & { `loginCallbackPath?`: `string` ; `logoutCallbackPath?`: `string`  }

#### Defined in

[src/patterns/FullStackConstruct.ts:59](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L59)

___

### backend

• **backend**: `Pick`<`Pick`<[`ServerlessConstructProps`](ServerlessConstructProps), ``"binaryMediaTypes"`` \| ``"minimumCompressionSize"`` \| ``"cloneFrom"`` \| ``"apiKeySourceType"`` \| ``"endpointConfiguration"`` \| ``"deploy"`` \| ``"deployOptions"`` \| ``"retainDeployments"`` \| ``"parameters"`` \| ``"policy"`` \| ``"failOnWarnings"`` \| ``"domainName"`` \| ``"cloudWatchRole"`` \| ``"endpointExportName"`` \| ``"endpointTypes"`` \| ``"disableExecuteApiEndpoint"`` \| ``"defaultIntegration"`` \| ``"defaultMethodOptions"`` \| ``"defaultCorsPreflightOptions"`` \| ``"role"`` \| ``"code"`` \| ``"events"`` \| ``"layers"`` \| ``"runtime"`` \| ``"timeout"`` \| ``"environment"`` \| ``"memorySize"`` \| ``"initialPolicy"`` \| ``"vpc"`` \| ``"vpcSubnets"`` \| ``"securityGroup"`` \| ``"securityGroups"`` \| ``"allowAllOutbound"`` \| ``"deadLetterQueueEnabled"`` \| ``"deadLetterQueue"`` \| ``"tracing"`` \| ``"profiling"`` \| ``"profilingGroup"`` \| ``"insightsVersion"`` \| ``"reservedConcurrentExecutions"`` \| ``"logRetention"`` \| ``"logRetentionRole"`` \| ``"logRetentionRetryOptions"`` \| ``"currentVersionOptions"`` \| ``"filesystem"`` \| ``"allowPublicSubnet"`` \| ``"environmentEncryption"`` \| ``"codeSigningConfig"`` \| ``"architectures"`` \| ``"architecture"`` \| ``"onFailure"`` \| ``"onSuccess"`` \| ``"maxEventAge"`` \| ``"retryAttempts"`` \| ``"externalId"`` \| ``"externalIds"`` \| ``"managedPolicies"`` \| ``"inlinePolicies"`` \| ``"path"`` \| ``"permissionsBoundary"`` \| ``"maxSessionDuration"`` \| ``"users"`` \| ``"groups"`` \| ``"statements"`` \| ``"force"`` \| ``"document"`` \| ``"encryptionKey"`` \| ``"retention"`` \| ``"removalPolicy"`` \| ``"table"`` \| ``"tables"`` \| ``"tableEnvKey"`` \| ``"name"`` \| ``"dontOverrideLogicalId"`` \| ``"canInvoke"`` \| ``"warmingEvent"`` \| ``"loggingLevel"`` \| ``"api"`` \| ``"existingLogGroups"`` \| ``"lambdas"`` \| ``"logicalId"`` \| ``"kinesisStream"`` \| ``"readCapacity"`` \| ``"writeCapacity"`` \| ``"billingMode"`` \| ``"pointInTimeRecovery"`` \| ``"serverSideEncryption"`` \| ``"encryption"`` \| ``"timeToLiveAttribute"`` \| ``"stream"`` \| ``"replicationRegions"`` \| ``"replicationTimeout"`` \| ``"waitForReplicationToFinish"`` \| ``"contributorInsightsEnabled"`` \| ``"userPool"`` \| ``"gatewayResponses"`` \| ``"buildDevServer"`` \| ``"configFile"``\>, ``"binaryMediaTypes"`` \| ``"minimumCompressionSize"`` \| ``"cloneFrom"`` \| ``"apiKeySourceType"`` \| ``"endpointConfiguration"`` \| ``"deploy"`` \| ``"deployOptions"`` \| ``"retainDeployments"`` \| ``"parameters"`` \| ``"policy"`` \| ``"failOnWarnings"`` \| ``"domainName"`` \| ``"cloudWatchRole"`` \| ``"endpointExportName"`` \| ``"endpointTypes"`` \| ``"disableExecuteApiEndpoint"`` \| ``"defaultIntegration"`` \| ``"defaultMethodOptions"`` \| ``"defaultCorsPreflightOptions"`` \| ``"role"`` \| ``"code"`` \| ``"events"`` \| ``"layers"`` \| ``"runtime"`` \| ``"timeout"`` \| ``"environment"`` \| ``"memorySize"`` \| ``"initialPolicy"`` \| ``"vpc"`` \| ``"vpcSubnets"`` \| ``"securityGroup"`` \| ``"securityGroups"`` \| ``"allowAllOutbound"`` \| ``"deadLetterQueueEnabled"`` \| ``"deadLetterQueue"`` \| ``"tracing"`` \| ``"profiling"`` \| ``"profilingGroup"`` \| ``"insightsVersion"`` \| ``"reservedConcurrentExecutions"`` \| ``"logRetention"`` \| ``"logRetentionRole"`` \| ``"logRetentionRetryOptions"`` \| ``"currentVersionOptions"`` \| ``"filesystem"`` \| ``"allowPublicSubnet"`` \| ``"environmentEncryption"`` \| ``"codeSigningConfig"`` \| ``"architectures"`` \| ``"architecture"`` \| ``"onFailure"`` \| ``"onSuccess"`` \| ``"maxEventAge"`` \| ``"retryAttempts"`` \| ``"externalId"`` \| ``"externalIds"`` \| ``"managedPolicies"`` \| ``"inlinePolicies"`` \| ``"path"`` \| ``"permissionsBoundary"`` \| ``"maxSessionDuration"`` \| ``"users"`` \| ``"groups"`` \| ``"statements"`` \| ``"force"`` \| ``"document"`` \| ``"encryptionKey"`` \| ``"retention"`` \| ``"removalPolicy"`` \| ``"table"`` \| ``"tables"`` \| ``"tableEnvKey"`` \| ``"name"`` \| ``"dontOverrideLogicalId"`` \| ``"canInvoke"`` \| ``"warmingEvent"`` \| ``"loggingLevel"`` \| ``"api"`` \| ``"lambdas"`` \| ``"logicalId"`` \| ``"kinesisStream"`` \| ``"readCapacity"`` \| ``"writeCapacity"`` \| ``"billingMode"`` \| ``"pointInTimeRecovery"`` \| ``"serverSideEncryption"`` \| ``"encryption"`` \| ``"timeToLiveAttribute"`` \| ``"stream"`` \| ``"replicationRegions"`` \| ``"replicationTimeout"`` \| ``"waitForReplicationToFinish"`` \| ``"contributorInsightsEnabled"`` \| ``"userPool"`` \| ``"gatewayResponses"`` \| ``"buildDevServer"`` \| ``"configFile"``\>

#### Defined in

[src/patterns/FullStackConstruct.ts:57](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L57)

___

### core

• `Optional` **core**: `Pick`<[`CoreConstructProps`](CoreConstructProps), ``"removalPolicy"`` \| ``"vpcs"`` \| ``"comment"`` \| ``"queryLogsLogGroupArn"`` \| ``"subjectAlternativeNames"`` \| ``"validationDomains"`` \| ``"validationMethod"`` \| ``"validation"`` \| ``"includeSubdomains"`` \| ``"hostedZoneId"`` \| ``"certificateArn"``\>

#### Defined in

[src/patterns/FullStackConstruct.ts:55](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L55)

___

### env

• `Optional` `Readonly` **env**: `Environment`

#### Defined in

[src/patterns/FullStackConstruct.ts:32](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L32)

___

### frontend

• **frontend**: `Pick`<[`CDNConstructProps`](CDNConstructProps), ``"bucketName"`` \| ``"removalPolicy"`` \| ``"dontOverrideLogicalId"`` \| ``"api"`` \| ``"codePaths"`` \| ``"buildWwwSubdomain"`` \| ``"hostedZone"`` \| ``"certificate"`` \| ``"bucketProps"`` \| ``"deploymentRole"``\>

#### Defined in

[src/patterns/FullStackConstruct.ts:56](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L56)

___

### nested

• `Optional` **nested**: false \| true

#### Defined in

[src/patterns/FullStackConstruct.ts:51](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L51)

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

#### Defined in

[src/patterns/FullStackConstruct.ts:47](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L47)

___

### removalPolicy

• `Optional` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

#### Defined in

[src/patterns/FullStackConstruct.ts:50](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L50)

___

### rootDomain

• **rootDomain**: `string`

#### Defined in

[src/patterns/FullStackConstruct.ts:49](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L49)

___

### stackTimeout

• `Optional` **stackTimeout**: `Duration`

#### Defined in

[src/patterns/FullStackConstruct.ts:52](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L52)

___

### stage

• **stage**: `string`

#### Defined in

[src/patterns/FullStackConstruct.ts:48](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L48)

___

### uiDevPort

• `Optional` **uiDevPort**: `string` \| `number`

#### Defined in

[src/patterns/FullStackConstruct.ts:53](https://github.com/matthewkeil/full-stack-pattern/blob/73a40c7/src/patterns/FullStackConstruct.ts#L53)
