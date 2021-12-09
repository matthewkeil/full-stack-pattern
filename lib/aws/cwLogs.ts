import { config, CloudWatchLogs, SharedIniFileCredentials } from 'aws-sdk';

export const existingLogGroups = async ({
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
