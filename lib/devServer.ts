import { homedir } from 'os';
import { resolve } from 'path';
import { configureInstaller, launch, stop } from 'dynamodb-local';
import { CreateTableCommandInput } from '@aws-sdk/client-dynamodb';
import {
  HandlerConfig,
  DevServerConfig as BaseDevServerConfig,
  addToDevServer,
  getDevServer,
  startDevServer as baseStartDevServer
} from 'convert-lambda-to-express';
import { DynamoAction, getDevTable } from './aws/dynamodb';

const devServerTables: CreateTableCommandInput[] = [];
export function addTableToDevServer(table: CreateTableCommandInput) {
  devServerTables.push(table);
}

let DEV_DYNAMO_PORT: number | undefined;
let DEV_DYNAMO_ENDPOINT: string | undefined;

export function startLocalDynamodb({ dynamodbPort = 8000 }: { dynamodbPort?: number } = {}) {
  console.log(
    'Starting DynamoDB Local.\nThe first time takes a few seconds to download before it starts.'
  );
  configureInstaller({ installPath: resolve(homedir(), '.aws', 'dynamodb') });

  launch(dynamodbPort, null, ['-sharedDb']).then((dynamodbLocal) => {
    DEV_DYNAMO_PORT = dynamodbPort;
    DEV_DYNAMO_ENDPOINT = `http://localhost:${DEV_DYNAMO_PORT}`;
    dynamodbLocal.on('error', () => {
      console.log('DynamoDB local exited with error');
    });
    dynamodbLocal.on('exit', () => {
      console.log('DynamoDB sub-process stopped');
    });

    console.log(`DynamoDB Local listening at http://localhost:${dynamodbPort}`);

    process.on('exit', function () {
      stop(dynamodbPort);
      console.log('DynamoDB local stopped');
    });
  });

  return dynamodbPort;
}

export async function loadDevTables({ profile, region }: { profile?: string; region?: string }) {
  const createPromises = [];
  for (const table of devServerTables) {
    createPromises.push(
      getDevTable({
        table,
        region,
        profile,
        endpoint: DEV_DYNAMO_ENDPOINT
      })
    );
  }
  Promise.all(createPromises).then(() =>
    console.log(`created ${createPromises.length} dev tables`)
  );
}

interface DevServerConfig extends BaseDevServerConfig, DynamoAction {
  dynamodbPort?: number;
}

export function startDevServer(config: DevServerConfig) {
  if (devServerTables.length) {
    startLocalDynamodb(config);
    loadDevTables(config);
  }
  const { app, restart, server } = baseStartDevServer(config);
  return { app, server, restart, devDynamoEndpoint: DEV_DYNAMO_ENDPOINT };
}

export {
  devServerTables,
  HandlerConfig,
  BaseDevServerConfig as DevServerConfig,
  addToDevServer as addHandlerToDevServer,
  getDevServer
};

