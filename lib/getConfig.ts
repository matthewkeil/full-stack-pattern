import { toKebab } from './changeCase';
import { getLocalGitBranch } from './getLocalGitBranch';

export function getConfig<S extends { branch: string }, T>(
  stages: S[],
  statics?: T
): () => Promise<S & T & { stage: string }> {
  return async () => {
    let branch: string;
    // pipeline deploys don't have git command available
    if (process.env.BRANCH) {
      branch = process.env.BRANCH;
    } else {
      branch = await getLocalGitBranch();
    }
    if (!branch) {
      throw new Error('could not determine what branch to deploy');
    }

    const config = stages.find(stage => stage.branch === branch) || stages[0];
    return {
      ...config,
      ...((statics ?? {}) as T),
      stage: toKebab(branch === 'master' ? 'prod' : branch)
    };
  };
}
