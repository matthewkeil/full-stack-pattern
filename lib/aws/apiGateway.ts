import { APIGateway, AWSError } from 'aws-sdk';
import { getCredentials } from './getCredentials';

export const getApiGatewayAccountRole = async ({
  profile,
  region = process.env.REGION ?? 'us-east-1'
}: {
  region: string;
  profile?: string;
}): Promise<string | undefined> => {
  const credentials = await getCredentials({ profile });
  const apiGateway = new APIGateway({ region, credentials });
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
