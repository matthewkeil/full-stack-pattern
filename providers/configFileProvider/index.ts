import YAML from 'yaml';
import deepMerge from 'deepmerge';
import { S3 } from 'aws-sdk';
import {
  buildHandler,
  CreateEventHandler,
  CustomResourceProvider,
  UpdateEventHandler
} from 'custom-resource-provider';
import { toKebab } from '../../lib/changeCase';

const s3 = new S3();
const FILE_NAME = 'config';

interface ConfigFileProps {
  targetBucketName: string;
  fileName?: string;
  fileType?: 'js' | 'json' | 'yaml';
  config: object;
}

function buildFile({ config, fileType }: Pick<ConfigFileProps, 'config' | 'fileType'>) {
  const stringified =
    fileType === 'yaml'
      ? YAML.stringify(config)
      : JSON.stringify(config)
          .replace('"true"', 'true')
          .replace('"false"', 'false');
  switch (fileType) {
    case 'json':
      return { Body: stringified, ContentType: 'application/json' };
    case 'yaml':
      return { Body: stringified, ContentType: 'text/yaml' };
    case 'js':
      return { Body: `var CONFIG = JSON.parse('${stringified}');`, ContentType: 'text/javascript' };
    default:
      throw new Error(fileType + ' is an invalid filetype');
  }
}

async function buildAndUploadFile(props: Required<ConfigFileProps>) {
  let merged: object;
  try {
    const { Body } = await s3
      .getObject({
        Bucket: props.targetBucketName,
        Key: props.fileName
      })
      .promise();
    const config =
      props.fileType === 'json'
        ? JSON.parse(Body?.toString() ?? '{}')
        : props.fileType === 'yaml'
        ? YAML.parse(Body?.toString() ?? '')
        : {};
    merged = deepMerge(props.config, config);
  } catch {
    merged = { ...props.config };
  }

  const { Body, ContentType } = buildFile({ config: merged, fileType: props.fileType });
  console.log({ Body });
  return s3
    .putObject({
      Bucket: props.targetBucketName,
      Key: props.fileName,
      ContentType,
      Body
    })
    .promise();
}

function getFileInfo(props: ConfigFileProps) {
  const fileType = props.fileType ?? 'js';
  return {
    fileType,
    fileName: props.fileName ?? `${FILE_NAME}.${fileType}`
  };
}

const updateFile: UpdateEventHandler<ConfigFileProps> = async event => {
  const { ResourceProperties } = event;
  const { fileName, fileType } = getFileInfo(ResourceProperties);
  const PhysicalResourceId =
    event.PhysicalResourceId ?? toKebab(`${ResourceProperties.targetBucketName}-${fileName}`);

  console.log('handling: ' + PhysicalResourceId);
  await buildAndUploadFile({
    ...ResourceProperties,
    fileName,
    fileType
  });
  return {
    Status: 'SUCCESS',
    PhysicalResourceId
  };
};

const ConfigFile = new CustomResourceProvider<ConfigFileProps>({
  create: (updateFile as unknown) as CreateEventHandler<ConfigFileProps>,
  update: updateFile,
  delete: async event => {
    const { ResourceProperties } = event;
    const { fileName } = getFileInfo(ResourceProperties);
    console.log(`deleting s3://${ResourceProperties.targetBucketName}/${fileName}`);
    try {
      await s3
        .deleteObject({
          Bucket: ResourceProperties.targetBucketName,
          Key: fileName
        })
        .promise();
    } catch {
      console.log(`s3://${ResourceProperties.targetBucketName}/${fileName} was not found`);
    }
    return {
      Status: 'SUCCESS'
    };
  }
});

export const handler = buildHandler({ ConfigFile });
