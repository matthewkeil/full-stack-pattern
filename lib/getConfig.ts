import { toKebab } from './changeCase';
import { getLocalGitBranch } from './getLocalGitBranch';

function getStageName(branch: string): string {
  return toKebab(
    branch === 'main' || branch === 'master'
      ? 'prod'
      : branch === 'develop'
      ? 'dev'
      : branch
      ? branch
      : 'master'
  );
}

interface BaseStaticConfig {
  client: string;
  project: string;
}
interface BaseStageConfig {
  branch: string;
}

export function getConfig<S extends BaseStageConfig, T extends BaseStaticConfig>(
  stages: S[] = [],
  staticConfig: T = {} as T
) {
  return async (branch?: string): Promise<S & T & { stage: string; prefix: string }> => {
    let _branch = branch;
    if (!_branch) {
      if (process.env.BRANCH) {
        _branch = process.env.BRANCH;
      } else {
        _branch = await getLocalGitBranch();
      }
    }

    const stage = getStageName(_branch);
    let stageConfig = stages.find(stage => stage.branch === _branch);
    if (!stageConfig) {
      stageConfig = stages[0] ?? {};
      stageConfig.branch = _branch;
    }

    return {
      ...staticConfig,
      ...stageConfig,
      stage,
      prefix: `${staticConfig.client}-${staticConfig.project}-${stage}`
    };
  };
}
