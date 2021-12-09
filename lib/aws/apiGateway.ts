import { config, APIGateway, AWSError, SharedIniFileCredentials } from 'aws-sdk';

const apiGateway = new APIGateway({ region: process.env.REGION || 'us-east-1' });

export const getApiGatewayAccountRole = async ({
  profile,
  region = process.env.REGION ?? 'us-east-1'
}: {
  region: string;
  profile?: string;
}): Promise<string | undefined> => {
  if (profile) {
    config.credentials = new SharedIniFileCredentials({ profile });
  } else {
    config.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ''
    };
  }
  try {
    const { cloudwatchRoleArn } = await apiGateway.getAccount({ region }).promise();
    return cloudwatchRoleArn;
  } catch (err) {
    if (err instanceof Error && (err as AWSError).code === 'NoSuchEntity') {
      return;
    }
    throw err;
  }
};
