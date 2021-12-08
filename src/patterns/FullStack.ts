import { Construct } from '@aws-cdk/core';
import { FullStackConstruct, FullStackProps } from './FullStackConstruct';

export class FullStack extends FullStackConstruct {
  constructor(scope: Construct, id: string, props: Omit<FullStackProps, 'nested'>) {
    super(scope, id, {
      ...props,
      nested: false,
    });
  }

  static async create(
    scope: Construct,
    id: string,
    props: FullStackProps & {
      profile: string;
    }
  ) {
    const _props = await FullStackConstruct.lookupExistingResources(props);
    return new FullStack(scope, id, _props);
  }
}

const fs = new FullStack(app, 'FullStack', {
  stage: 'dev',
  prefix: `${client}-${project}-${stage}`,
  rootDomain: 'example.com'
  // cdn: {
  //   codePaths: [resolve(__dirname, '..', 'frontend', 'build')]
  // },
  // serverless: {
  //   code: resolve(__dirname, '..', 'backend', 'src'),
  //   runtime: Runtime.NODEJS_14_X,
  //   tables: [
  //     {
  //       name: 'important-table',
  //       partitionKey: {
  //         id: 'string'
  //       }
  //     }
  //   ],
  //   lambdas: [
  //     {
  //       name: 'get-something-from-dynamo',
  //       handler: 'index.handler',
  //       table: 'important-table',
  //       events: [{
  //         method: 'GET',
  //         path: '/something/{id}'
  //       }]
  //     },
  //     {
  //       name: 'put-something-to-dynamo',
  //       handler: 'index.handler',
  //       table: 'important-table',
  //       events: [{
  //         method: 'PUT',
  //         path: '/something'
  //       }]
  //     }
  //   ]
  // }
});
