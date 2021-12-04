import { APIGateway, AWSError } from 'aws-sdk';

const apiGateway = new APIGateway({ region: process.env.REGION || 'us-east-1' });

export const getApiGatewayAccountRole = async (): Promise<string | undefined> => {
  try {
    const { cloudwatchRoleArn } = await apiGateway.getAccount().promise();
    return cloudwatchRoleArn;
  } catch (err) {
    if (err instanceof Error && (err as AWSError).code === 'NoSuchEntity') {
      return;
    }
    throw err;
  }
};
