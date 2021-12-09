import { getConfig as GET_CONFIG } from './lib';

const staticProps = {
  client: 'mk',
  project: 'fsp-docs',
  rootDomain: 'matthewkeil.com',
  subDomain: 'full-stack-pattern'
};

interface Stage {
  branch: string;
  profile: string;
  env: {
    account: string;
    region: string;
  };
}

const stages: Stage[] = [
  {
    branch: 'AWS',
    profile: 'default',
    env: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      account: process.env.AWS_ACCOUNT_ID!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      region: process.env.REGION!
    }
  }
];

export function getConfig(branch?: string) {
  return GET_CONFIG<Stage, typeof staticProps>(stages, staticProps)(branch);
}
