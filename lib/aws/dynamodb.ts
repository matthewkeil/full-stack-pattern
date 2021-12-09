import { config, DynamoDB, SharedIniFileCredentials } from 'aws-sdk';
export const listTableNames = async ({
  prefix,
  profile,
  region = process.env.REGION ?? 'us-east-1'
}: {
  region?: string;
  profile?: string;
  prefix?: string;
}): Promise<string[]> => {
  if (profile) {
    config.credentials = new SharedIniFileCredentials({ profile });
  } else {
    config.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ''
    };
  }
  const dynamo = new DynamoDB({ region });
  try {
    const tables: string[] = [];
    let ExclusiveStartTableName: string | undefined;
    do {
      const { TableNames = [], LastEvaluatedTableName } = await dynamo
        .listTables({ ExclusiveStartTableName })
        .promise();
      ExclusiveStartTableName = LastEvaluatedTableName;
      tables.push(...TableNames);
    } while (ExclusiveStartTableName);
    return prefix ? tables.filter(tableName => tableName.includes(prefix)) : tables;
  } catch {
    return [];
  }
};
