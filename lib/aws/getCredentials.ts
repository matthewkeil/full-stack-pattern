import { config, SharedIniFileCredentials, Credentials } from 'aws-sdk';

const baseCredentials = new Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ''
});

export const getCredentials = async ({ profile }: { profile?: string }): Promise<Credentials> => {
  let credentials: undefined | Credentials;
  if (profile) {
    credentials = new SharedIniFileCredentials({ profile });
    if (!credentials.accessKeyId?.length) {
      credentials = baseCredentials;
    }
  } else {
    credentials = baseCredentials;
  }
  config.credentials = credentials;
  return credentials;
};
