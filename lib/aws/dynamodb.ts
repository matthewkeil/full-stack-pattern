// import { SharedIniFileCredentials } from 'aws-sdk';
import { getCredentials } from './getCredentials';
import { DynamoDB, CreateTableCommandInput, ScanInput } from '@aws-sdk/client-dynamodb';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import { CredentialProvider } from '@aws-sdk/types';

export interface DynamoAction {
  profile?: string;
  region?: string;
  endpoint?: string;
}

let _region: string;
let _profile: string;
let _endpoint: string;
let dynamo: DynamoDB | undefined;
export function getDynamo({ endpoint, profile, region }: DynamoAction) {
  if (region !== _region || profile !== _profile || endpoint !== _endpoint) {
    dynamo = undefined;
  }
  if (!dynamo) {
    let credentials: CredentialProvider | undefined;
    if (profile) {
      credentials = fromIni({ profile });
    }
    dynamo = new DynamoDB({
      endpoint,
      region,
      credentials
    });
  }

  return dynamo;
}

export const listTableNames = async (
  props: DynamoAction & { prefix?: string }
): Promise<string[]> => {
  const dynamo = getDynamo(props);
  try {
    const tables: string[] = [];
    let ExclusiveStartTableName: string | undefined;
    do {
      const { TableNames = [], LastEvaluatedTableName } = await dynamo.listTables({
        ExclusiveStartTableName
      });
      ExclusiveStartTableName = LastEvaluatedTableName;
      tables.push(...TableNames);
    } while (ExclusiveStartTableName);
    return props.prefix
      ? tables.filter((tableName) => tableName.includes(props.prefix as string))
      : tables;
  } catch {
    return [];
  }
};

export async function tableExists(props: DynamoAction & { tableName: string }) {
  const dynamo = getDynamo(props);
  try {
    return await dynamo.describeTable({ TableName: props.tableName });
  } catch (e) {
    if ((e as Error)?.name === 'ResourceNotFoundException') {
      return undefined;
    }
    throw e;
  }
}

export async function getDevTable(props: DynamoAction & { table: CreateTableCommandInput }) {
  const dynamo = getDynamo(props);
  const tableDescription = await tableExists({ ...props, tableName: `${props.table.TableName}` });
  if (tableDescription) {
    return { existing: true, ...tableDescription.Table };
  }
  const { TableDescription } = await dynamo.createTable(props.table);
  return { existing: false, ...TableDescription };
}

export async function listItems({
  tableName,
  region,
  profile
}: {
  tableName: string;
  region?: string;
  profile?: string;
}) {
  const credentials = await getCredentials({ profile });
  const dynamo = new DynamoDB({ region, credentials });

  const items = [];
  let ExclusiveStartKey: ScanInput['ExclusiveStartKey'];
  do {
    const { Items = [], LastEvaluatedKey } = await dynamo.scan({
      TableName: tableName,
      ExclusiveStartKey
    });

    ExclusiveStartKey = LastEvaluatedKey;
    items.push(...Items);
  } while (ExclusiveStartKey);

  return items;
}
