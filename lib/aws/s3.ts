import { config, S3, SharedIniFileCredentials } from 'aws-sdk';
export const bucketExists = async ({
  profile,
  region,
  bucketName
}: {
  profile?: string;
  region?: string;
  bucketName: string;
}): Promise<boolean> => {
  if (profile) {
    config.credentials = new SharedIniFileCredentials({ profile });
  }
  const s3 = new S3({ region });
  try {
    await s3.headBucket({ Bucket: bucketName }).promise();
    return true;
  } catch {
    return false;
  }
};
