import { Construct } from '@aws-cdk/core';
import { BaseConstruct, BaseConstructProps } from '../../constructs/BaseConstruct';

export interface Neo4jConstructProps extends BaseConstructProps {}

export class Neo4jConstruct extends BaseConstruct {
  constructor(scope: Construct, id: string, props: Neo4jConstructProps) {
    super(scope, id, props);

    // const instance = new
  }
}
