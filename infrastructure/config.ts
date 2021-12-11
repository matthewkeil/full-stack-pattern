/* eslint-disable @typescript-eslint/no-non-null-assertion */
require('dotenv').config();
import { getConfig as GET_CONFIG } from '../lib';

const staticProps = {
  client: 'mk',
  project: 'fsp-docs',
  rootDomain: 'example.com',
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
    branch: 'default',
    profile: process.env.PROFILE!,
    env: {
      account: process.env.ACCOUNT_ID!,
      region: process.env.REGION!
    }
  },
  {
    branch: 'dev',
    profile: process.env.PROFILE!,
    env: {
      account: process.env.ACCOUNT_ID!,
      region: process.env.REGION!
    }
  },
  {
    branch: 'master',
    profile: process.env.PROFILE!,
    env: {
      account: process.env.ACCOUNT_ID!,
      region: process.env.REGION!
    }
  }
];

export function getConfig(branch?: string) {
  return GET_CONFIG(stages, staticProps)(branch);
}
