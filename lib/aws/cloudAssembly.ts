import { CloudFormationStackArtifact } from '@aws-cdk/cx-api';

type ResourceType = `AWS::${string}`;

interface Resource {
  Type: ResourceType;
  Properties: any;
  UpdateReplacePolicy: string;
  DeletionPolicy: string;
  DependsOn: string[];
  Metadata?: { [key: string]: string };
}

interface CloudFormationResources {
  [name: string]: Resource;
}

export function getResourcesBy({
  type,
  stack
}: {
  type?: ResourceType;
  stack: CloudFormationStackArtifact;
}) {
  const Resources = stack.template.Resources as CloudFormationResources;
  return Object.entries(Resources)
    .filter(([, { Type }]) => Type === type)
    .map(([name, resource]) => ({ name, resource }));
}

export function getAssetPath(resource: Resource) {
  const { Metadata = {} } = resource;
  return Metadata['aws:asset:path'];
}
