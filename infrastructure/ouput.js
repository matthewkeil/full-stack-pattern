const ouput = {
  directory: 'cdk.out',
  manifest: {
    version: '15.0.0',
    artifacts: {
      Tree: { type: 'cdk:tree', properties: { file: 'tree.json' } },
      'FullStackPatternDocs.assets': {
        type: 'cdk:asset-manifest',
        properties: {
          file: 'FullStackPatternDocs.assets.json',
          requiresBootstrapStackVersion: 6,
          bootstrapStackVersionSsmParameter: '/cdk-bootstrap/hnb659fds/version'
        }
      },
      FullStackPatternDocs: {
        type: 'aws:cloudformation:stack',
        environment: 'aws://141394433500/us-east-1',
        properties: {
          templateFile: 'FullStackPatternDocs.template.json',
          validateOnSynth: false,
          assumeRoleArn: 'arn:${AWS::Partition}:iam::141394433500:role/cdk-hnb659fds-deploy-role-141394433500-us-east-1',
          cloudFormationExecutionRoleArn: 'arn:${AWS::Partition}:iam::141394433500:role/cdk-hnb659fds-cfn-exec-role-141394433500-us-east-1',
          stackTemplateAssetObjectUrl: 's3://cdk-hnb659fds-assets-141394433500-us-east-1/21f702bb930748f6bd75f0683cbf73ab4331d718d37de6b985d8075dcbfa46d1.json',
          requiresBootstrapStackVersion: 6,
          bootstrapStackVersionSsmParameter: '/cdk-bootstrap/hnb659fds/version',
          additionalDependencies: [ 'FullStackPatternDocs.assets' ],
          stackName: 'mk-fsp-docs-prod'
        },
        dependencies: [ 'FullStackPatternDocs.assets' ],
        metadata: {
          '/FullStackPatternDocs/FullStack/Core/CoreConstruct/HostedZoneId': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CoreConstructHostedZoneId7B1DB3E6',
              trace: [
                'CoreConstruct.buildHostedZone (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/core/CoreConstruct.ts:166:5)',
                'new CoreConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/core/CoreConstruct.ts:136:28)',
                'new CoreNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/core/CoreNestedStack.ts:26:41)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:107:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/Core/CoreConstruct/CertificateArn': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CoreConstructCertificateArn562C49C3',
              trace: [
                'CoreConstruct.buildCertificate (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/core/CoreConstruct.ts:200:5)',
                'new CoreConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/core/CoreConstruct.ts:138:29)',
                'new CoreNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/core/CoreNestedStack.ts:26:41)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:107:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/Core/CDKMetadata/Default': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDKMetadata',
              trace: [
                'new MetadataResource (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/metadata-resource.ts:22:24)',
                '/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:166:5',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:231:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'injectMetadataResources (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:157:3)',
                'Object.synthesize (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:18:3)',
                'App.synth (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stage.ts:94:23)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:28:21)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/Core.NestedStack/Core.NestedStackResource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'FullStackCoreNestedStackCoreNestedStackResource48E190C5',
              trace: [
                'new NestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/nested-stack.ts:77:21)',
                'new CoreNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/core/CoreNestedStack.ts:21:5)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:107:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDNConstruct/OriginAccessIdentity/Resource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDNConstructOriginAccessIdentity318D8353',
              trace: [
                'new OriginAccessIdentity (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-cloudfront/lib/origin-access-identity.ts:80:21)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:264:33)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDNConstruct/Bucket/Resource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'Bucket',
              trace: [
                'new Bucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:758:22)',
                'CDNConstruct.buildBucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:314:20)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:267:24)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDNConstruct/Bucket/Policy/Resource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDNConstructBucketPolicyDDBD2CE7',
              trace: [
                'new BucketPolicy (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket-policy.ts:30:21)',
                'Bucket.addToResourcePolicy (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:228:21)',
                'Bucket.enableAutoDeleteObjects (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:1162:10)',
                'new Bucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:826:12)',
                'CDNConstruct.buildBucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:314:20)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:267:24)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDNConstruct/Bucket/AutoDeleteObjectsCustomResource/Default': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDNConstructBucketAutoDeleteObjectsCustomResourceD96389C9',
              trace: [
                'new CustomResource (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/custom-resource.ts:36:21)',
                'Bucket.enableAutoDeleteObjects (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:1175:28)',
                'new Bucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:826:12)',
                'CDNConstruct.buildBucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:314:20)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:267:24)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDNConstruct/Distribution/CFDistribution': [
            {
              type: 'aws:cdk:logicalId',
              data: 'Distribution',
              trace: [
                'new CloudFrontWebDistribution (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-cloudfront/lib/web-distribution.ts:568:26)',
                'CDNConstruct.buildDistribution (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:418:26)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:268:30)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDNConstruct/BucketDeployment/AwsCliLayer/Resource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDNConstructBucketDeploymentAwsCliLayerE89A3237',
              trace: [
                'new LayerVersion (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-lambda/lib/layers.ts:132:39)',
                'new AwsCliLayer (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/lambda-layer-awscli/lib/awscli-layer.ts:10:5)',
                'new BucketDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3-deployment/lib/bucket-deployment.ts:144:16)',
                'CDNConstruct.buildCodeDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:534:5)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:269:10)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDNConstruct/BucketDeployment/CustomResource/Default': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDNConstructBucketDeploymentCustomResource9034F425',
              trace: [
                'new CustomResource (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/custom-resource.ts:36:21)',
                'new BucketDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3-deployment/lib/bucket-deployment.ts:176:5)',
                'CDNConstruct.buildCodeDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:534:5)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:269:10)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDNConstruct/FullStackPatternMatthewkeil.comARecord/Resource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDNConstructFullStackPatternMatthewkeilcomARecord2A106F56',
              trace: [
                'new RecordSet (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-route53/lib/record-set.ts:119:23)',
                'new ARecord (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-route53/lib/record-set.ts:146:5)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:275:7)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/Custom::S3AutoDeleteObjectsCustomResourceProvider/Role': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092',
              trace: [
                'new CustomResourceProvider (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/custom-resource-provider/custom-resource-provider.ts:116:18)',
                'Function.getOrCreateProvider (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/custom-resource-provider/custom-resource-provider.ts:70:10)',
                'Bucket.enableAutoDeleteObjects (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:1154:45)',
                'new Bucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:826:12)',
                'CDNConstruct.buildBucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:314:20)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:267:24)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/Custom::S3AutoDeleteObjectsCustomResourceProvider/Handler': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CustomS3AutoDeleteObjectsCustomResourceProviderHandler9D90184F',
              trace: [
                'new CustomResourceProvider (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/custom-resource-provider/custom-resource-provider.ts:134:21)',
                'Function.getOrCreateProvider (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/custom-resource-provider/custom-resource-provider.ts:70:10)',
                'Bucket.enableAutoDeleteObjects (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:1154:45)',
                'new Bucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:826:12)',
                'CDNConstruct.buildBucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:314:20)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:267:24)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/Custom::CDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C/ServiceRole/Resource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRole89A01265',
              trace: [
                'new Role (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-iam/lib/role.ts:199:18)',
                'new Function (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-lambda/lib/function.ts:321:31)',
                'SingletonFunction.ensureLambda (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-lambda/lib/singleton-lambda.ts:116:12)',
                'new SingletonFunction (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-lambda/lib/singleton-lambda.ts:39:32)',
                'new BucketDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3-deployment/lib/bucket-deployment.ts:141:21)',
                'CDNConstruct.buildCodeDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:534:5)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:269:10)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/Custom::CDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C/ServiceRole/DefaultPolicy/Resource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRoleDefaultPolicy88902FDF',
              trace: [
                'new Policy (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-iam/lib/policy.ts:89:22)',
                'Role.addToPrincipalPolicy (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-iam/lib/role.ts:236:28)',
                'Function.addToPrincipal (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-iam/lib/grant.ts:92:61)',
                'Function.addToPrincipalOrResource (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-iam/lib/grant.ts:48:26)',
                'Import.grant (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:384:27)',
                'Import.grantRead (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:281:17)',
                'Asset.grantRead (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3-assets/lib/asset.ts:146:17)',
                'Object.bind (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3-deployment/lib/source.ts:65:15)',
                '/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3-deployment/lib/bucket-deployment.ts:165:83',
                'Array.map (<anonymous>)',
                'new BucketDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3-deployment/lib/bucket-deployment.ts:165:51)',
                'CDNConstruct.buildCodeDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:534:5)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:269:10)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/Custom::CDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C/Resource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C81C01536',
              trace: [
                'new Function (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-lambda/lib/function.ts:391:35)',
                'SingletonFunction.ensureLambda (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-lambda/lib/singleton-lambda.ts:116:12)',
                'new SingletonFunction (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-lambda/lib/singleton-lambda.ts:39:32)',
                'new BucketDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3-deployment/lib/bucket-deployment.ts:141:21)',
                'CDNConstruct.buildCodeDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:534:5)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:269:10)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/AWSCloudFrontPartitionHostedZoneIdMap': [
            {
              type: 'aws:cdk:logicalId',
              data: 'AWSCloudFrontPartitionHostedZoneIdMap',
              trace: [
                'Function.getHostedZoneId (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-route53-targets/lib/cloudfront-target.ts:17:7)',
                'CloudFrontTarget.bind (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-route53-targets/lib/cloudfront-target.ts:36:38)',
                'new RecordSet (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-route53/lib/record-set.ts:124:73)',
                'new ARecord (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-route53/lib/record-set.ts:146:5)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:275:7)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDKMetadata/Default': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDKMetadata',
              trace: [
                'new MetadataResource (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/metadata-resource.ts:22:24)',
                '/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:166:5',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:231:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'injectMetadataResources (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:157:3)',
                'Object.synthesize (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:18:3)',
                'App.synth (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stage.ts:94:23)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:28:21)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN.NestedStack/CDN.NestedStackResource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'FullStackCDNNestedStackCDNNestedStackResourceA01C9AE5',
              trace: [
                'new NestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/nested-stack.ts:77:21)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:18:5)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/CDKMetadata/Default': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDKMetadata',
              trace: [
                'new MetadataResource (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/metadata-resource.ts:22:24)',
                '/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:166:5',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:231:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'injectMetadataResources (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:157:3)',
                'Object.synthesize (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:18:3)',
                'App.synth (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stage.ts:94:23)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:28:21)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)'
              ]
            }
          ],
          '/FullStackPatternDocs/BootstrapVersion': [
            {
              type: 'aws:cdk:logicalId',
              data: 'BootstrapVersion',
              trace: [
                'addBootstrapVersionRule (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stack-synthesizers/default-synthesizer.ts:458:17)',
                'DefaultStackSynthesizer.synthesize (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stack-synthesizers/default-synthesizer.ts:284:7)',
                '/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:184:29',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:231:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'synthesizeTree (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:176:3)',
                'Object.synthesize (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:39:3)',
                'App.synth (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stage.ts:94:23)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:28:21)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)'
              ]
            }
          ],
          '/FullStackPatternDocs/CheckBootstrapVersion': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CheckBootstrapVersion',
              trace: [
                'addBootstrapVersionRule (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stack-synthesizers/default-synthesizer.ts:468:3)',
                'DefaultStackSynthesizer.synthesize (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stack-synthesizers/default-synthesizer.ts:284:7)',
                '/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:184:29',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:231:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'synthesizeTree (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:176:3)',
                'Object.synthesize (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:39:3)',
                'App.synth (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stage.ts:94:23)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:28:21)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)'
              ]
            }
          ]
        },
        displayName: 'FullStackPatternDocs'
      }
    }
  },
  version: '15.0.0',
  artifacts: [
    AssetManifestArtifact {
      assembly: [Circular *1],
      id: 'FullStackPatternDocs.assets',
      manifest: {
        type: 'cdk:asset-manifest',
        properties: {
          file: 'FullStackPatternDocs.assets.json',
          requiresBootstrapStackVersion: 6,
          bootstrapStackVersionSsmParameter: '/cdk-bootstrap/hnb659fds/version'
        }
      },
      messages: [],
      _dependencyIDs: [],
      file: '/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/cdk.out/FullStackPatternDocs.assets.json',
      requiresBootstrapStackVersion: 6,
      bootstrapStackVersionSsmParameter: '/cdk-bootstrap/hnb659fds/version',
      _deps: []
    },
    TreeCloudArtifact {
      assembly: [Circular *1],
      id: 'Tree',
      manifest: { type: 'cdk:tree', properties: { file: 'tree.json' } },
      messages: [],
      _dependencyIDs: [],
      file: 'tree.json',
      _deps: []
    },
    CloudFormationStackArtifact {
      assembly: [Circular *1],
      id: 'FullStackPatternDocs',
      manifest: {
        type: 'aws:cloudformation:stack',
        environment: 'aws://141394433500/us-east-1',
        properties: {
          templateFile: 'FullStackPatternDocs.template.json',
          validateOnSynth: false,
          assumeRoleArn: 'arn:${AWS::Partition}:iam::141394433500:role/cdk-hnb659fds-deploy-role-141394433500-us-east-1',
          cloudFormationExecutionRoleArn: 'arn:${AWS::Partition}:iam::141394433500:role/cdk-hnb659fds-cfn-exec-role-141394433500-us-east-1',
          stackTemplateAssetObjectUrl: 's3://cdk-hnb659fds-assets-141394433500-us-east-1/21f702bb930748f6bd75f0683cbf73ab4331d718d37de6b985d8075dcbfa46d1.json',
          requiresBootstrapStackVersion: 6,
          bootstrapStackVersionSsmParameter: '/cdk-bootstrap/hnb659fds/version',
          additionalDependencies: [ 'FullStackPatternDocs.assets' ],
          stackName: 'mk-fsp-docs-prod'
        },
        dependencies: [ 'FullStackPatternDocs.assets' ],
        metadata: {
          '/FullStackPatternDocs/FullStack/Core/CoreConstruct/HostedZoneId': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CoreConstructHostedZoneId7B1DB3E6',
              trace: [
                'CoreConstruct.buildHostedZone (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/core/CoreConstruct.ts:166:5)',
                'new CoreConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/core/CoreConstruct.ts:136:28)',
                'new CoreNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/core/CoreNestedStack.ts:26:41)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:107:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/Core/CoreConstruct/CertificateArn': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CoreConstructCertificateArn562C49C3',
              trace: [
                'CoreConstruct.buildCertificate (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/core/CoreConstruct.ts:200:5)',
                'new CoreConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/core/CoreConstruct.ts:138:29)',
                'new CoreNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/core/CoreNestedStack.ts:26:41)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:107:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/Core/CDKMetadata/Default': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDKMetadata',
              trace: [
                'new MetadataResource (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/metadata-resource.ts:22:24)',
                '/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:166:5',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:231:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'injectMetadataResources (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:157:3)',
                'Object.synthesize (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:18:3)',
                'App.synth (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stage.ts:94:23)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:28:21)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/Core.NestedStack/Core.NestedStackResource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'FullStackCoreNestedStackCoreNestedStackResource48E190C5',
              trace: [
                'new NestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/nested-stack.ts:77:21)',
                'new CoreNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/core/CoreNestedStack.ts:21:5)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:107:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDNConstruct/OriginAccessIdentity/Resource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDNConstructOriginAccessIdentity318D8353',
              trace: [
                'new OriginAccessIdentity (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-cloudfront/lib/origin-access-identity.ts:80:21)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:264:33)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDNConstruct/Bucket/Resource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'Bucket',
              trace: [
                'new Bucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:758:22)',
                'CDNConstruct.buildBucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:314:20)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:267:24)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDNConstruct/Bucket/Policy/Resource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDNConstructBucketPolicyDDBD2CE7',
              trace: [
                'new BucketPolicy (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket-policy.ts:30:21)',
                'Bucket.addToResourcePolicy (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:228:21)',
                'Bucket.enableAutoDeleteObjects (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:1162:10)',
                'new Bucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:826:12)',
                'CDNConstruct.buildBucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:314:20)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:267:24)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDNConstruct/Bucket/AutoDeleteObjectsCustomResource/Default': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDNConstructBucketAutoDeleteObjectsCustomResourceD96389C9',
              trace: [
                'new CustomResource (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/custom-resource.ts:36:21)',
                'Bucket.enableAutoDeleteObjects (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:1175:28)',
                'new Bucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:826:12)',
                'CDNConstruct.buildBucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:314:20)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:267:24)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDNConstruct/Distribution/CFDistribution': [
            {
              type: 'aws:cdk:logicalId',
              data: 'Distribution',
              trace: [
                'new CloudFrontWebDistribution (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-cloudfront/lib/web-distribution.ts:568:26)',
                'CDNConstruct.buildDistribution (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:418:26)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:268:30)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDNConstruct/BucketDeployment/AwsCliLayer/Resource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDNConstructBucketDeploymentAwsCliLayerE89A3237',
              trace: [
                'new LayerVersion (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-lambda/lib/layers.ts:132:39)',
                'new AwsCliLayer (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/lambda-layer-awscli/lib/awscli-layer.ts:10:5)',
                'new BucketDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3-deployment/lib/bucket-deployment.ts:144:16)',
                'CDNConstruct.buildCodeDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:534:5)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:269:10)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDNConstruct/BucketDeployment/CustomResource/Default': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDNConstructBucketDeploymentCustomResource9034F425',
              trace: [
                'new CustomResource (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/custom-resource.ts:36:21)',
                'new BucketDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3-deployment/lib/bucket-deployment.ts:176:5)',
                'CDNConstruct.buildCodeDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:534:5)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:269:10)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDNConstruct/FullStackPatternMatthewkeil.comARecord/Resource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDNConstructFullStackPatternMatthewkeilcomARecord2A106F56',
              trace: [
                'new RecordSet (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-route53/lib/record-set.ts:119:23)',
                'new ARecord (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-route53/lib/record-set.ts:146:5)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:275:7)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/Custom::S3AutoDeleteObjectsCustomResourceProvider/Role': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092',
              trace: [
                'new CustomResourceProvider (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/custom-resource-provider/custom-resource-provider.ts:116:18)',
                'Function.getOrCreateProvider (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/custom-resource-provider/custom-resource-provider.ts:70:10)',
                'Bucket.enableAutoDeleteObjects (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:1154:45)',
                'new Bucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:826:12)',
                'CDNConstruct.buildBucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:314:20)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:267:24)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/Custom::S3AutoDeleteObjectsCustomResourceProvider/Handler': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CustomS3AutoDeleteObjectsCustomResourceProviderHandler9D90184F',
              trace: [
                'new CustomResourceProvider (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/custom-resource-provider/custom-resource-provider.ts:134:21)',
                'Function.getOrCreateProvider (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/custom-resource-provider/custom-resource-provider.ts:70:10)',
                'Bucket.enableAutoDeleteObjects (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:1154:45)',
                'new Bucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:826:12)',
                'CDNConstruct.buildBucket (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:314:20)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:267:24)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/Custom::CDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C/ServiceRole/Resource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRole89A01265',
              trace: [
                'new Role (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-iam/lib/role.ts:199:18)',
                'new Function (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-lambda/lib/function.ts:321:31)',
                'SingletonFunction.ensureLambda (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-lambda/lib/singleton-lambda.ts:116:12)',
                'new SingletonFunction (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-lambda/lib/singleton-lambda.ts:39:32)',
                'new BucketDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3-deployment/lib/bucket-deployment.ts:141:21)',
                'CDNConstruct.buildCodeDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:534:5)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:269:10)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/Custom::CDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C/ServiceRole/DefaultPolicy/Resource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRoleDefaultPolicy88902FDF',
              trace: [
                'new Policy (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-iam/lib/policy.ts:89:22)',
                'Role.addToPrincipalPolicy (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-iam/lib/role.ts:236:28)',
                'Function.addToPrincipal (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-iam/lib/grant.ts:92:61)',
                'Function.addToPrincipalOrResource (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-iam/lib/grant.ts:48:26)',
                'Import.grant (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:384:27)',
                'Import.grantRead (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3/lib/bucket.ts:281:17)',
                'Asset.grantRead (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3-assets/lib/asset.ts:146:17)',
                'Object.bind (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3-deployment/lib/source.ts:65:15)',
                '/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3-deployment/lib/bucket-deployment.ts:165:83',
                'Array.map (<anonymous>)',
                'new BucketDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3-deployment/lib/bucket-deployment.ts:165:51)',
                'CDNConstruct.buildCodeDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:534:5)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:269:10)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/Custom::CDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C/Resource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C81C01536',
              trace: [
                'new Function (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-lambda/lib/function.ts:391:35)',
                'SingletonFunction.ensureLambda (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-lambda/lib/singleton-lambda.ts:116:12)',
                'new SingletonFunction (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-lambda/lib/singleton-lambda.ts:39:32)',
                'new BucketDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-s3-deployment/lib/bucket-deployment.ts:141:21)',
                'CDNConstruct.buildCodeDeployment (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:534:5)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:269:10)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/AWSCloudFrontPartitionHostedZoneIdMap': [
            {
              type: 'aws:cdk:logicalId',
              data: 'AWSCloudFrontPartitionHostedZoneIdMap',
              trace: [
                'Function.getHostedZoneId (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-route53-targets/lib/cloudfront-target.ts:17:7)',
                'CloudFrontTarget.bind (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-route53-targets/lib/cloudfront-target.ts:36:38)',
                'new RecordSet (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-route53/lib/record-set.ts:124:73)',
                'new ARecord (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/aws-route53/lib/record-set.ts:146:5)',
                'new CDNConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNConstruct.ts:275:7)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:23:44)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN/CDKMetadata/Default': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDKMetadata',
              trace: [
                'new MetadataResource (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/metadata-resource.ts:22:24)',
                '/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:166:5',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:231:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'injectMetadataResources (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:157:3)',
                'Object.synthesize (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:18:3)',
                'App.synth (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stage.ts:94:23)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:28:21)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)'
              ]
            }
          ],
          '/FullStackPatternDocs/FullStack/CDN.NestedStack/CDN.NestedStackResource': [
            {
              type: 'aws:cdk:logicalId',
              data: 'FullStackCDNNestedStackCDNNestedStackResourceA01C9AE5',
              trace: [
                'new NestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/nested-stack.ts:77:21)',
                'new CDNNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/stacks/cdn/CDNNestedStack.ts:18:5)',
                'new FullStackConstruct (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullStackConstruct.ts:134:11)',
                'new FullNestedStack (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:21:23)',
                'Function.create (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/src/patterns/FullNestedStack.ts:40:12)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:14:3)'
              ]
            }
          ],
          '/FullStackPatternDocs/CDKMetadata/Default': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CDKMetadata',
              trace: [
                'new MetadataResource (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/metadata-resource.ts:22:24)',
                '/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:166:5',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:231:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'injectMetadataResources (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:157:3)',
                'Object.synthesize (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:18:3)',
                'App.synth (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stage.ts:94:23)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:28:21)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)'
              ]
            }
          ],
          '/FullStackPatternDocs/BootstrapVersion': [
            {
              type: 'aws:cdk:logicalId',
              data: 'BootstrapVersion',
              trace: [
                'addBootstrapVersionRule (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stack-synthesizers/default-synthesizer.ts:458:17)',
                'DefaultStackSynthesizer.synthesize (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stack-synthesizers/default-synthesizer.ts:284:7)',
                '/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:184:29',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:231:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'synthesizeTree (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:176:3)',
                'Object.synthesize (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:39:3)',
                'App.synth (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stage.ts:94:23)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:28:21)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)'
              ]
            }
          ],
          '/FullStackPatternDocs/CheckBootstrapVersion': [
            {
              type: 'aws:cdk:logicalId',
              data: 'CheckBootstrapVersion',
              trace: [
                'addBootstrapVersionRule (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stack-synthesizers/default-synthesizer.ts:468:3)',
                'DefaultStackSynthesizer.synthesize (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stack-synthesizers/default-synthesizer.ts:284:7)',
                '/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:184:29',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:231:5)',
                'visit (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:227:5)',
                'synthesizeTree (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:176:3)',
                'Object.synthesize (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/private/synthesis.ts:39:3)',
                'App.synth (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/node_modules/@aws-cdk/core/lib/stage.ts:94:23)',
                'buildCdk (/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/infrastructure/buildCdk.ts:28:21)',
                'processTicksAndRejections (internal/process/task_queues.js:95:5)'
              ]
            }
          ]
        },
        displayName: 'FullStackPatternDocs'
      },
      messages: [],
      _dependencyIDs: [ 'FullStackPatternDocs.assets' ],
      environment: {
        account: '141394433500',
        region: 'us-east-1',
        name: 'aws://141394433500/us-east-1'
      },
      templateFile: 'FullStackPatternDocs.template.json',
      parameters: {},
      tags: {},
      assumeRoleArn: 'arn:${AWS::Partition}:iam::141394433500:role/cdk-hnb659fds-deploy-role-141394433500-us-east-1',
      assumeRoleExternalId: undefined,
      cloudFormationExecutionRoleArn: 'arn:${AWS::Partition}:iam::141394433500:role/cdk-hnb659fds-cfn-exec-role-141394433500-us-east-1',
      stackTemplateAssetObjectUrl: 's3://cdk-hnb659fds-assets-141394433500-us-east-1/21f702bb930748f6bd75f0683cbf73ab4331d718d37de6b985d8075dcbfa46d1.json',
      requiresBootstrapStackVersion: 6,
      bootstrapStackVersionSsmParameter: '/cdk-bootstrap/hnb659fds/version',
      terminationProtection: undefined,
      validateOnSynth: false,
      stackName: 'mk-fsp-docs-prod',
      assets: [],
      displayName: 'FullStackPatternDocs (mk-fsp-docs-prod)',
      name: 'mk-fsp-docs-prod',
      originalName: 'mk-fsp-docs-prod',
      _deps: [
        AssetManifestArtifact {
          assembly: [Circular *1],
          id: 'FullStackPatternDocs.assets',
          manifest: {
            type: 'cdk:asset-manifest',
            properties: {
              file: 'FullStackPatternDocs.assets.json',
              requiresBootstrapStackVersion: 6,
              bootstrapStackVersionSsmParameter: '/cdk-bootstrap/hnb659fds/version'
            }
          },
          messages: [],
          _dependencyIDs: [],
          file: '/Users/matthewkeil/Documents/dev/personal/full-stack-pattern/cdk.out/FullStackPatternDocs.assets.json',
          requiresBootstrapStackVersion: 6,
          bootstrapStackVersionSsmParameter: '/cdk-bootstrap/hnb659fds/version',
          _deps: []
        }
      ],
      _template: {
        Resources: {
          FullStackCoreNestedStackCoreNestedStackResource48E190C5: {
            Type: 'AWS::CloudFormation::Stack',
            Properties: {
              TemplateURL: {
                'Fn::Join': [
                  '',
                  [
                    'https://s3.us-east-1.',
                    { Ref: 'AWS::URLSuffix' },
                    '/cdk-hnb659fds-assets-141394433500-us-east-1/c7c31a711c7314291fda86e2f85c44566f01fcf721aa5a967927e3eb33901e48.json'
                  ]
                ]
              }
            },
            UpdateReplacePolicy: 'Delete',
            DeletionPolicy: 'Delete',
            Metadata: {
              'aws:cdk:path': 'FullStackPatternDocs/FullStack/Core.NestedStack/Core.NestedStackResource',
              'aws:asset:path': 'FullStackPatternDocsFullStackCoreF197A42E.nested.template.json',
              'aws:asset:property': 'TemplateURL'
            }
          },
          FullStackCDNNestedStackCDNNestedStackResourceA01C9AE5: {
            Type: 'AWS::CloudFormation::Stack',
            Properties: {
              TemplateURL: {
                'Fn::Join': [
                  '',
                  [
                    'https://s3.us-east-1.',
                    { Ref: 'AWS::URLSuffix' },
                    '/cdk-hnb659fds-assets-141394433500-us-east-1/bbe5a47e7e4fe4bcccafa0473f08db66876ff4ffb1d3d456414cae447816bc65.json'
                  ]
                ]
              }
            },
            UpdateReplacePolicy: 'Delete',
            DeletionPolicy: 'Delete',
            Metadata: {
              'aws:cdk:path': 'FullStackPatternDocs/FullStack/CDN.NestedStack/CDN.NestedStackResource',
              'aws:asset:path': 'FullStackPatternDocsFullStackCDN5E1CC625.nested.template.json',
              'aws:asset:property': 'TemplateURL'
            }
          },
          CDKMetadata: {
            Type: 'AWS::CDK::Metadata',
            Properties: {
              Analytics: 'v2:deflate64:H4sIAAAAAAAA/y3IMQqAMAwAwLd0r9Gg4Cr4g/oCiRHaYgpNq4P4dwedDg4B+wE6M62XNrTFllJmuJeyUrRzEi25UrHzLn/t4lhTzcSPlbQxBG1PHABHQBPU+yZXKf5gcJ8vDLJOHmIAAAA='
            },
            Metadata: {
              'aws:cdk:path': 'FullStackPatternDocs/CDKMetadata/Default'
            }
          }
        },
        Parameters: {
          BootstrapVersion: {
            Type: 'AWS::SSM::Parameter::Value<String>',
            Default: '/cdk-bootstrap/hnb659fds/version',
            Description: 'Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]'
          }
        },
        Rules: {
          CheckBootstrapVersion: {
            Assertions: [
              {
                Assert: {
                  'Fn::Not': [
                    {
                      'Fn::Contains': [
                        [ '1', '2', '3', '4', '5' ],
                        { Ref: 'BootstrapVersion' }
                      ]
                    }
                  ]
                },
                AssertDescription: "CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI."
              }
            ]
          }
        }
      }
    }
  ],
  runtime: { libraries: {} }
}