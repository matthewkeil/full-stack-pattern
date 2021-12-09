import { toKebab } from './changeCase';
import { getLocalGitBranch } from './getLocalGitBranch';

function getStageName(branch: string): string {
  return toKebab(
    branch === 'main' || branch === 'master' ? 'prod' : branch === 'develop' ? 'dev' : branch
  );
}

export function getConfig<S extends { branch: string }, T>(stages: S[], staticConfig: T = {} as T) {
  return async (branch?: string): Promise<S & T & { stage: string }> => {
    let _branch = branch;
    if (!_branch) {
      // pipeline deploys don't have git command available
      if (process.env.BRANCH) {
        _branch = process.env.BRANCH;
      } else {
        _branch = await getLocalGitBranch();
      }
    }
    if (!_branch) {
      throw new Error('could not determine what branch to deploy');
    }

    const stageConfig = stages.find(stage => stage.branch === _branch) || stages[0];
    return {
      ...staticConfig,
      ...stageConfig,
      stage: getStageName(_branch)
    };
  };
}
