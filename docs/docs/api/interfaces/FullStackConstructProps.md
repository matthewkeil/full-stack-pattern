---
id: "FullStackConstructProps"
title: "Interface: FullStackConstructProps"
sidebar_label: "FullStackConstructProps"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### cdn

• `Optional` **cdn**: `Pick`<[`CDNConstructProps`](CDNConstructProps), ``"bucketName"`` \| ``"removalPolicy"`` \| ``"dontOverrideLogicalId"`` \| ``"api"`` \| ``"codePaths"`` \| ``"useExistingBucket"`` \| ``"noBucketPolicy"`` \| ``"buildWwwSubdomain"`` \| ``"hostedZone"`` \| ``"certificate"`` \| ``"bucketProps"`` \| ``"deploymentRole"``\>

Settings for the [CDNConstruct](https://full-stack-pattern.matthewkeil.com/docs/cdn/cdnConstruct)

Optional: If you do not provide this a CDNConstruct will not be built

prefix, stage and rootDomain are not available on fullStackProps.cdn
They are passed in from fullStackProp.prefix and fullStackProp.stage
and fullStackProp.rootDomain

**`param`**

#### Defined in

[src/patterns/FullStackConstruct.ts:143](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/patterns/FullStackConstruct.ts#L143)

___

### cognito

• `Optional` **cognito**: [`FullStackCognitoProp`](../modules#fullstackcognitoprop)

Settings for the [CognitoConstruct](https://full-stack-pattern.matthewkeil.com/docs/cognito/cognitoConstruct)

rootDomain is not available on core, it is passed in from fullStackProp.rootDomain

**`param`**

#### Defined in

[src/patterns/FullStackConstruct.ts:163](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/patterns/FullStackConstruct.ts#L163)

___

### core

• `Optional` **core**: `Pick`<[`CoreConstructProps`](CoreConstructProps), ``"removalPolicy"`` \| ``"dontOverrideLogicalId"`` \| ``"vpcs"`` \| ``"comment"`` \| ``"queryLogsLogGroupArn"`` \| ``"subjectAlternativeNames"`` \| ``"validationDomains"`` \| ``"validationMethod"`` \| ``"hostedZoneId"`` \| ``"includeSubdomains"`` \| ``"certificateArn"``\>

Settings for the [CoreConstruct](https://full-stack-pattern.matthewkeil.com/docs/core/coreConstruct)

Optional: If you do not provide a `rootDomain` this will be ignored and a
CoreConstruct will not be built

rootDomain is not available on core, it is passed in from
fullStackProp.rootDomain

**`param`**

#### Defined in

[src/patterns/FullStackConstruct.ts:131](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/patterns/FullStackConstruct.ts#L131)

___

### env

• `Optional` `Readonly` **env**: `Environment`

The env for the stacks

#### Defined in

[src/patterns/FullStackConstruct.ts:46](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/patterns/FullStackConstruct.ts#L46)

___

### nested

• `Optional` **nested**: false \| true

Builds the component stacks as either Stack's or NestedStack's

#### Defined in

[src/patterns/FullStackConstruct.ts:95](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/patterns/FullStackConstruct.ts#L95)

___

### noCognito

• `Optional` **noCognito**: false \| true

No CognitoConstruct will be built

#### Defined in

[src/patterns/FullStackConstruct.ts:119](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/patterns/FullStackConstruct.ts#L119)

___

### prefix

• `Optional` **prefix**: `string`

The prefix to use with resource names. If `prefix` and `name` are
provided then the apiName will be `${prefix}-${name}`.  If no name
is provided then the apiName will be `prefix`. For more info, see
[Naming](https://full-stack-pattern.matthewkeil.com/docs/naming)

#### Defined in

[src/patterns/FullStackConstruct.ts:60](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/patterns/FullStackConstruct.ts#L60)

___

### removalPolicy

• `Optional` **removalPolicy**: `DESTROY` \| `RETAIN` \| `SNAPSHOT`

RemovalPolicy to apply to all resources.  If a RemovalPolicy prop is provided
for a specific resource, ie the `props.core.removalPolicy`, it will
override this value

#### Defined in

[src/patterns/FullStackConstruct.ts:108](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/patterns/FullStackConstruct.ts#L108)

___

### rootDomain

• `Optional` **rootDomain**: `string`

The url/rootDomain for the HostedZone.  If you don not provide a
rootDomain a CoreConstruct will not be created.

**`example`** If you are hosting the ui at `www.example.com` and the api
at `api.example.com` the rootDomain would be `example.com`  This is
similar for branches, such as `dev.api.example.com` and
`dev.example.com`.  The rootDomain will still be `example.com`.

#### Defined in

[src/patterns/FullStackConstruct.ts:71](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/patterns/FullStackConstruct.ts#L71)

___

### serverless

• `Optional` **serverless**: `Pick`<[`ServerlessConstructProps`](ServerlessConstructProps), ``"rootDomain"`` \| ``"binaryMediaTypes"`` \| ``"minimumCompressionSize"`` \| ``"cloneFrom"`` \| ``"apiKeySourceType"`` \| ``"endpointConfiguration"`` \| ``"deploy"`` \| ``"deployOptions"`` \| ``"retainDeployments"`` \| ``"parameters"`` \| ``"policy"`` \| ``"failOnWarnings"`` \| ``"domainName"`` \| ``"cloudWatchRole"`` \| ``"endpointExportName"`` \| ``"endpointTypes"`` \| ``"disableExecuteApiEndpoint"`` \| ``"defaultIntegration"`` \| ``"defaultMethodOptions"`` \| ``"defaultCorsPreflightOptions"`` \| ``"role"`` \| ``"code"`` \| ``"events"`` \| ``"layers"`` \| ``"runtime"`` \| ``"timeout"`` \| ``"environment"`` \| ``"memorySize"`` \| ``"initialPolicy"`` \| ``"vpc"`` \| ``"vpcSubnets"`` \| ``"securityGroup"`` \| ``"securityGroups"`` \| ``"allowAllOutbound"`` \| ``"deadLetterQueueEnabled"`` \| ``"deadLetterQueue"`` \| ``"tracing"`` \| ``"profiling"`` \| ``"profilingGroup"`` \| ``"insightsVersion"`` \| ``"reservedConcurrentExecutions"`` \| ``"logRetention"`` \| ``"logRetentionRole"`` \| ``"logRetentionRetryOptions"`` \| ``"currentVersionOptions"`` \| ``"filesystem"`` \| ``"allowPublicSubnet"`` \| ``"environmentEncryption"`` \| ``"codeSigningConfig"`` \| ``"architectures"`` \| ``"architecture"`` \| ``"onFailure"`` \| ``"onSuccess"`` \| ``"maxEventAge"`` \| ``"retryAttempts"`` \| ``"externalId"`` \| ``"externalIds"`` \| ``"managedPolicies"`` \| ``"inlinePolicies"`` \| ``"path"`` \| ``"permissionsBoundary"`` \| ``"maxSessionDuration"`` \| ``"users"`` \| ``"groups"`` \| ``"statements"`` \| ``"force"`` \| ``"document"`` \| ``"encryptionKey"`` \| ``"retention"`` \| ``"removalPolicy"`` \| ``"table"`` \| ``"tables"`` \| ``"tableEnvKey"`` \| ``"name"`` \| ``"dontOverrideLogicalId"`` \| ``"canInvoke"`` \| ``"warmingEvent"`` \| ``"loggingLevel"`` \| ``"api"`` \| ``"existingLogGroups"`` \| ``"lambdas"`` \| ``"logicalId"`` \| ``"kinesisStream"`` \| ``"readCapacity"`` \| ``"writeCapacity"`` \| ``"billingMode"`` \| ``"pointInTimeRecovery"`` \| ``"serverSideEncryption"`` \| ``"encryption"`` \| ``"timeToLiveAttribute"`` \| ``"stream"`` \| ``"replicationRegions"`` \| ``"replicationTimeout"`` \| ``"waitForReplicationToFinish"`` \| ``"contributorInsightsEnabled"`` \| ``"hostedZone"`` \| ``"certificate"`` \| ``"userPool"`` \| ``"gatewayResponses"`` \| ``"buildDevServer"`` \| ``"subDomain"``\>

Settings for the [ServerlessConstruct](https://full-stack-pattern.matthewkeil.com/docs/serverless/serverlessConstruct)

Optional: If you do not provide this a ServerlessConstruct will not be
built

prefix, stage  are not available on fullStackProps.serverless, they are passed
in from fullStackProp.prefix and fullStackProp.stage

**`param`**

#### Defined in

[src/patterns/FullStackConstruct.ts:155](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/patterns/FullStackConstruct.ts#L155)

___

### stackTimeout

• `Optional` **stackTimeout**: `Duration`

This is the NestedStack stack timeout that will be applied. For
non-nested stacks, this is ignored.

#### Defined in

[src/patterns/FullStackConstruct.ts:101](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/patterns/FullStackConstruct.ts#L101)

___

### stage

• `Optional` **stage**: `string`

The deployment stage name.  This will be used to prefix all resources.

**`default`** "prod"

#### Defined in

[src/patterns/FullStackConstruct.ts:52](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/patterns/FullStackConstruct.ts#L52)

___

### subDomain

• `Optional` **subDomain**: `string`

Optional: A url subDomain to host the application at. Will still use the
HostedZone at rootDomain but all of this application will be hosted at
the subDomain

Assume your HostedZone is at `rootDomain: "example.com"` and you want to
host at `subDomain: "best-app"`

This subDomain is the new "default" root of the application
- the UI will be at `best-app.example.com` and the
  dev branch will be at `dev.best-app.example.com`.
  Optionally you can build `www.best-app.example.com`

- The Api will be at
  `api.best-app.example.com` and the dev api will be at
  `dev.api.best-app.example.com`

#### Defined in

[src/patterns/FullStackConstruct.ts:90](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/patterns/FullStackConstruct.ts#L90)

___

### uiDevPort

• `Optional` **uiDevPort**: `string` \| `number`

For standing the development server and configuring cors during development.
This is the localhost:PORT that serves your frontend

#### Defined in

[src/patterns/FullStackConstruct.ts:114](https://github.com/matthewkeil/full-stack-pattern/blob/47d5e8c/src/patterns/FullStackConstruct.ts#L114)
