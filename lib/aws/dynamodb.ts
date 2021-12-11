import { config, DynamoDB, SharedIniFileCredentials } from 'aws-sdk';
import { getCredentials } from './getCredentials';
export const listTableNames = async ({
  prefix,
  profile,
  region = process.env.REGION ?? 'us-east-1'
}: {
  region?: string;
  profile?: string;
  prefix?: string;
}): Promise<string[]> => {
  const credentials = await getCredentials({ profile });
  const dynamo = new DynamoDB({ region, credentials });
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
