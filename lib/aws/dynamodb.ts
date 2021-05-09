import { config, DynamoDB, SharedIniFileCredentials } from 'aws-sdk';
export const listTableNames = async ({
  profile,
  region
}: {
  profile?: string;
  region?: string;
}): Promise<string[]> => {
  if (profile) {
    config.credentials = new SharedIniFileCredentials({ profile });
  }
  const dynamo = new DynamoDB({ region });
  try {
    const { TableNames = [] } = await dynamo.listTables().promise();
    return TableNames;
  } catch {
    return [];
  }
};
