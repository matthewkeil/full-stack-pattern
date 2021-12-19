import { resolve } from 'path';
import { toKebab } from './changeCase';
import { getLocalGitBranch } from './getLocalGitBranch';

const DEFAULT_CONFIG_NAME = 'default';

function getStageName(branch: string): string {
  return toKebab(
    branch === 'main' || branch === 'master' ? 'prod' : branch === 'develop' ? 'dev' : branch
  );
}

const client = 'matthewkeil';
const project = 'full-stack';
const defaultStaticConfig = {
  client,
  project
};
type StaticConfig = { [key in keyof typeof defaultStaticConfig]: string };

const defaultStageConfig = {
  branch: 'master'
};
type StageConfig = { [key in keyof typeof defaultStageConfig]: string };

const stageKeys = Object.keys(defaultStageConfig);
function isStageConfig(obj: unknown): obj is StageConfig {
  if (obj && typeof obj == 'object') {
    const allExist = stageKeys.reduce((acc, key) => acc && key in obj, true);
    return allExist;
  }
  return false;
}

function getConfigFile<S extends StageConfig>(props: {
  dir?: string;
  filename: string;
  verbose?: boolean;
}) {
  const projectRoots = [
    resolve(__dirname, '..', '..', '..', '..'), // assume direct install
    resolve(__dirname, '..', '..', '..', '..', '..', '..') // assume monorepo;
  ];
  const subDirs = [
    ['config'], // checks {projectRoot}/config
    ['packages', 'config'] // checks {projectRoot}/packages/config
  ];
  const dirsToCheck = props.dir
    ? [props.dir]
    : projectRoots.map((dir) => subDirs.map((subDir) => resolve(dir, ...subDir))).flat();

  if (props.verbose) {
    console.log({ dirsToCheck });
  }

  let filename: string | undefined;
  for (const dir of dirsToCheck) {
    try {
      filename = require.resolve(resolve(dir, props.filename));
    } catch {
      continue;
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const configFile = require(filename);
    const config = configFile.default ?? configFile.config;
    if (isStageConfig(config)) {
      return config as S;
    }
  }
}

function getConfigFromArray<S extends StageConfig>({
  stages,
  branch
}: {
  stages: S[];
  branch: string;
}) {
  let config = stages.find((stage) => stage.branch === branch);
  if (!config && stages[0]) {
    config = stages[0];
    config.branch = branch;
  }
  if (isStageConfig(config)) {
    return config as S;
  }
}

// type Config<S extends StageConfig = StageConfig, T extends StaticConfig = StaticConfig> = S &
//   T & { stage: string; prefix: string };

export function getConfigFactory<S extends StageConfig, T extends StaticConfig>({
  configDir,
  stages,
  staticConfig = {} as T
}: {
  configDir?: string;
  stages?: S[];
  staticConfig: T;
}) {
  const defaultConfig = {
    ...(defaultStageConfig as S),
    ...(defaultStaticConfig as T),
    stage: 'prod',
    prefix: `${defaultStaticConfig.client}-${defaultStaticConfig.project}-prod`
  };
  return async function getConfig(branch?: string) {
    let _branch = branch;
    if (!_branch) {
      if (process.env.BRANCH) {
        _branch = process.env.BRANCH;
      } else {
        _branch = await getLocalGitBranch();
      }
    }
    if (!_branch) {
      throw new Error('could not determine what branch to deploy');
    }

    const stage = getStageName(_branch);

    let stageConfig: S | undefined;
    const config = {
      ...staticConfig,
      stage,
      prefix: `${staticConfig.client}-${staticConfig.project}-${stage}`
    };

    if (stages) {
      stageConfig = getConfigFromArray({ stages, branch: _branch });
      return !stageConfig ? defaultConfig : { ...config, ...stageConfig };
    }

    if (!stageConfig) {
      const DEFAULT_FILE_NAME = `${DEFAULT_CONFIG_NAME}.config.js`;
      const filenames = [`${stage}.config.js`, `${branch}.config.js`, DEFAULT_FILE_NAME];
      for (const filename of filenames) {
        stageConfig = getConfigFile({ dir: configDir, filename });
        if (stageConfig) {
          if (filename.includes(DEFAULT_FILE_NAME)) {
            stageConfig.branch = _branch;
          }
          break;
        }
      }
    }

    return stageConfig ? { ...config, ...stageConfig } : defaultConfig;
  };
}

export function getConfig<S extends StageConfig, T extends StaticConfig>(staticConfig: T) {
  return getConfigFactory<S, T>({ staticConfig })();
}
