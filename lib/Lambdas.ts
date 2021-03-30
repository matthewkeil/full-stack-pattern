import { Construct } from '@aws-cdk/core';
import { AssetCode } from '@aws-cdk/aws-lambda';
import { IRole, Policy, PolicyStatement } from '@aws-cdk/aws-iam';

export interface FunctionProps {
  name: string;
  code?: string;
  role?: IRole;
  policyStatements?: PolicyStatement[];
}

export interface LambdasProps extends Omit<FunctionProps, 'name'> {
  prefix: string;
  functions: FunctionProps[];
}

export class Lambdas extends Construct {
  constructor(scope: Construct, id: string, props: LambdasProps) {
    super(scope, id);
    const { prefix, code, role: globalRole, policyStatements: globalPolicyStatements, functions } = props;
    const kebabPrefix = toKebab(prefix);
    const pascalPrefix = toPascal(prefix);

    let globalAssetCode: AssetCode | undefined;
    if (code) {
      globalAssetCode = new AssetCode(code);
    }

    for (const { name, role: localRole, policyStatements: localPolicyStatements } of functions) {
      let role: IRole;
      let createdRole = false;
      const roleLogicalId = `${pascalPrefix}${toPascal(name)}Role`;
      if (localRole) {
        role = Role.fromRoleArn(this, roleLogicalId, localRole);
      } else if (globalRole) {
        role = Role.fromRoleArn(this, roleLogicalId, globalRole);
      } else {
        createdRole = true;
        role = new Role(this, roleLogicalId, {});
      }

      if (createdRole) {
        new Policy(this, `${pascalPrefix}${toPascal(name)}Policy`, {});
      }
    }
  }
}
