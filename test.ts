import { getCertArnForDomain } from './lib/aws/certificateManager';

getCertArnForDomain({ profile: 'admin', region: 'us-east-1', domain: 'dev.codeified.org' }).then(arn =>
  console.log(arn)
);
