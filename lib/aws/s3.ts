import { config, S3, SharedIniFileCredentials } from 'aws-sdk';
export const bucketExists = async ({
  bucketName,
  profile,
  region = process.env.REGION ?? 'us-east-1'
}: {
  profile?: string;
  region?: string;
  bucketName: string;
}): Promise<boolean> => {
  if (profile) {
    config.credentials = new SharedIniFileCredentials({ profile });
  } else {
    config.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ''
    };
  }
  const s3 = new S3({ region });
  try {
    await s3.headBucket({ Bucket: bucketName }).promise();
    return true;
  } catch {
    return false;
  }
};
