import { S3 } from 'aws-sdk';
import { getCredentials } from './getCredentials';
export const bucketExists = async ({
  bucketName,
  profile,
  region = process.env.REGION ?? 'us-east-1'
}: {
  profile?: string;
  region?: string;
  bucketName: string;
}): Promise<boolean> => {
  const credentials = await getCredentials({ profile });
  const s3 = new S3({ region, credentials });
  try {
    await s3.headBucket({ Bucket: bucketName }).promise();
    return true;
  } catch {
    return false;
  }
};
