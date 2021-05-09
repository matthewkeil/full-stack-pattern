import { config, CloudWatchLogs, SharedIniFileCredentials } from 'aws-sdk';
export const existingLogGroups = async ({
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
  const cw = new CloudWatchLogs({ region });
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
