import { App, RemovalPolicy } from '@aws-cdk/core';
import { resolve } from 'path';
import { FullNestedStack } from '..';
import { getConfig } from '../config';

(async function buildInfra() {
  const {
    client,
    project,
    stage,
    profile = 'default',
    env,
    subDomain,
    rootDomain
  } = await getConfig();
  const prefix = `${client}-${project}-${stage}`;
  const app = new App();
  await FullNestedStack.create(app, 'FullStackPatternDocs', {
    env,
    stage,
    prefix,
    profile,
    subDomain,
    rootDomain,
    stackName: prefix,
    uiDevPort: 3000,
    noCognito: true,
    removalPolicy: RemovalPolicy.DESTROY,
    cdn: {
      codePaths: [resolve(__dirname, 'build')],
      buildWwwSubdomain: false
    }
  });

  app.synth();
})();
