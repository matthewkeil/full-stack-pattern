import { App, RemovalPolicy } from '@aws-cdk/core';
import { resolve } from 'path';
import { FullNestedStack } from '../src/patterns/FullNestedStack';
import { getConfig } from './config';

(async function buildCdk() {
  const config = await getConfig();
  console.log({ config });

  const { env, stage, prefix, profile, subDomain, rootDomain } = config;
  const app = new App();

  await FullNestedStack.create(app, 'FullStackPatternDocs', {
    env,
    stage,
    prefix,
    profile,
    subDomain,
    rootDomain,
    stackName: prefix,
    noCognito: true,
    removalPolicy: RemovalPolicy.DESTROY,
    cdn: {
      codePaths: [resolve(__dirname, '..', 'docs', 'build')],
    }
  });

  app.synth();
})();
