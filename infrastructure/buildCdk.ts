import { inspect } from 'util';
import fs from 'fs';
import { resolve } from 'path';
import { App, Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';

import { FullNestedStack } from '../src/patterns/FullNestedStack';
import { getConfig } from './config';
import { getAssetPath, getResourcesBy } from '../lib/aws/cloudAssembly';

(async function buildCdk() {
  const config = await getConfig();
  const app = new App();

  await FullNestedStack.create(app, 'FullStackPatternDocs', {
    ...config,
    stackName: config.prefix,
    noCognito: true,
    removalPolicy: RemovalPolicy.DESTROY,
    cdn: {
      codePaths: [resolve(__dirname, '..', 'docs', 'build')],
      buildWwwSubdomain: false,
      codeDeploymentProps: {
        prune: false
      }
    }
  });

  const synth = app.synth();

  const nestedStacks = getResourcesBy({
    stack: synth.stacks[0],
    type: 'AWS::CloudFormation::Stack'
  });

  const paths = nestedStacks
    .map(({ resource }) => getAssetPath(resource))
    .map((filename) => resolve(__dirname, '..', 'cdk.out', filename));
  fs.promises.writeFile(resolve(__dirname, 'ouput.json'), JSON.stringify(test, null, 2));
})();
