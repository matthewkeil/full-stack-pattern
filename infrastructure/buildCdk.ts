import { resolve } from 'path';
import { App, RemovalPolicy } from '@aws-cdk/core';

import { FullNestedStack } from '../src/patterns/FullNestedStack';
import { getConfig } from './config';

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

  app.synth();
})();
