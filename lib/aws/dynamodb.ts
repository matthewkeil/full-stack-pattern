import { config, DynamoDB, SharedIniFileCredentials } from 'aws-sdk';
export const listTableNames = async ({
  profile,
  region,
  prefix
}: {
  profile?: string;
  region?: string;
  prefix?: string;
}): Promise<string[]> => {
  if (profile) {
    config.credentials = new SharedIniFileCredentials({ profile });
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
