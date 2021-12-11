/* eslint-disable @typescript-eslint/no-explicit-any */
import YAML from 'yaml';
import { S3 } from 'aws-sdk';
import {
  buildHandler,
  CreateEventHandler,
  CustomResourceProvider,
  UpdateEventHandler
} from 'custom-resource-provider';
import { mergeProps, toKebab } from '../../lib';

const s3 = new S3();

type FileType = 'js' | 'json' | 'yaml';

export interface ConfigFileProviderProps<T extends Record<string, unknown>> {
  /**
   * The bucketName of where to upload the file
   */
  bucketName: string;

  /**
   * The filename for the config file.  Supports .yml, .yaml, .json, or .js
   * extensions.
   */
  fileName: string;

  /**
   * Will go to the file in S3 and merge the passed configuration with the
   * existing configuration that is already in the file in S3.  Useful when
   * only part of the config changes by environment but the rest is fixed
   * and complex
   */
  mergeExisting?: boolean;

  /**
   * The actual configuration that will get turned into the file.  Library
   *
   * - uses YAML.stringify(config) for .yaml and .yml files
   * - uses JSON.stringify(config) for .json files
   * - creates a js file by stringifying the object with JSON.stringify and
   *   wrapping it with `var CONFIG_FILE = JSON.parse('${stringified}');`.
   *   Makes it globally available to the code in the browser via
   *   <head><script type="text/javascript" src="/config.js" /></head>
   */
  config: T;
}

interface PrivateConfigFileProps extends ConfigFileProviderProps<any> {
  IDEMOPOTENCY_TOKEN: string;
}

function buildUpload({
  config,
  fileType
}: {
  config: ConfigFileProviderProps<any>['config'];
  fileType: FileType;
}) {
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
      return {
        Body: `var CONFIG_FILE = JSON.parse('${stringified}');`,
        ContentType: 'text/javascript'
      };
    default:
      throw new Error(fileType + ' is an invalid filetype');
  }
}

async function buildAndUploadFile({
  fileName,
  fileType,
  config,
  bucketName,
  mergeExisting
}: Required<ConfigFileProviderProps<any>> & { fileType: FileType }) {
  let merged: Record<string, unknown>;
  if (!mergeExisting) {
    merged = config;
  } else {
    try {
      const { Body } = await s3
        .getObject({
          Bucket: bucketName,
          Key: fileName
        })
        .promise();

      const existing =
        fileType === 'json'
          ? JSON.parse(Body?.toString() ?? '{}')
          : fileType === 'yaml'
          ? YAML.parse(Body?.toString() ?? '')
          : {};

      merged = mergeProps(existing, config);
    } catch {
      merged = config;
    }
  }

  const { Body, ContentType } = buildUpload({ config: merged, fileType });
  console.log({ Body });

  return s3
    .putObject({
      Bucket: bucketName,
      Key: fileName,
      ContentType,
      Body
    })
    .promise();
}

function getFileType(props: PrivateConfigFileProps): FileType {
  const extension = props.fileName?.split('.')[1];
  if (!extension) {
    return 'js';
  }
  switch (extension) {
    case 'js':
    case 'ts':
      return 'js';
    case 'json':
      return 'json';
    case 'yaml':
    case 'yml':
      return 'yaml';
    default:
      throw new Error(extension + ' is an invalid filetype');
  }
}

const upsertFile: UpdateEventHandler<PrivateConfigFileProps> = async event => {
  const { ResourceProperties } = event;
  const { fileName, bucketName, config, mergeExisting = false } = ResourceProperties;
  const fileType = getFileType(ResourceProperties);

  const PhysicalResourceId = event.PhysicalResourceId ?? toKebab(`${bucketName}-${fileName}`);
  console.log('handling: ' + PhysicalResourceId);

  await buildAndUploadFile({
    fileName,
    fileType,
    bucketName,
    config,
    mergeExisting
  });

  return {
    Status: 'SUCCESS',
    PhysicalResourceId
  };
};

const ConfigFile = new CustomResourceProvider<PrivateConfigFileProps>({
  create: (upsertFile as unknown) as CreateEventHandler<PrivateConfigFileProps>,
  update: upsertFile,
  delete: async event => {
    const {
      ResourceProperties: { fileName, bucketName }
    } = event;
    console.log(`deleting s3://${bucketName}/${fileName}`);
    try {
      await s3
        .deleteObject({
          Bucket: bucketName,
          Key: fileName
        })
        .promise();
    } catch {
      console.log(`s3://${bucketName}/${fileName} was not found`);
    }
    return {
      Status: 'SUCCESS'
    };
  }
});

export const handler = buildHandler({ ConfigFile });
