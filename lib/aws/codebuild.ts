import { CodeBuild } from 'aws-sdk';
import { getCredentials } from './getCredentials';

type source = 'GITHUB' | 'GITHUB_ENTERPRISE' | 'BITBUCKET';

export const codeBuildHasCredentials = async ({
  profile,
  region,
  sourceType
}: {
  profile?: string;
  region: string;
  sourceType: source;
}) => {
  const credentials = await getCredentials({ profile });
  const codebuild = new CodeBuild({ region, credentials });
  try {
    const res = await codebuild.listSourceCredentials().promise();
    const sourceCredentials = res.sourceCredentialsInfos;

    if (sourceCredentials && sourceCredentials.length) {
      for (const credential of sourceCredentials) {
        if (credential.serverType === sourceType) {
          return true;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
  return false;
};
