import { CloudWatchLogs } from 'aws-sdk';
import { getCredentials } from './getCredentials';

export const existingLogGroups = async ({
  prefix,
  profile,
  region = process.env.REGION ?? 'us-east-1'
}: {
  region?: string;
  profile?: string;
  prefix?: string;
}): Promise<string[]> => {
  const credentials = await getCredentials({ profile });
  const cw = new CloudWatchLogs({ region, credentials });
  try {
    const logGroupNames: string[] = [];
    let token: string | undefined;
    do {
      const { logGroups = [], nextToken } = await cw
        .describeLogGroups({ nextToken: token })
        .promise();
      token = nextToken;
      logGroupNames.push(...logGroups.map(({ logGroupName }) => `${logGroupName}`));
    } while (token);
    return prefix ? logGroupNames.filter(name => name.includes(prefix)) : logGroupNames;
  } catch {
    return [];
  }
};
