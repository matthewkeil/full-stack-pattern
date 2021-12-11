import {SharedIniFileCredentials, CodeBuild} from 'aws-sdk';

type source = 'GITHUB' | 'GITHUB_ENTERPRISE' | 'BITBUCKET';

export const areCodeBuildCredentials = async ({
  profile,
  region,
  sourceType
}: {
  profile?: string;
  region: string;
  sourceType: source;
}) => {
  let codebuild: CodeBuild;
  if (profile && !process.env.CICD) {
    const credentials = new SharedIniFileCredentials({profile});
    codebuild = new CodeBuild({region, credentials});
  } else {
    codebuild = new CodeBuild({region});
  }
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
