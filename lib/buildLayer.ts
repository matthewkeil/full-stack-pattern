#!/usr/bin/env node
import { resolve } from 'path';
import { promises } from 'fs';
import { exec } from './exec';

async function buildFolders(folders: string[]): Promise<void> {
  for (const folder of folders) {
    try {
      await promises.stat(folder);
    } catch {
      await promises.mkdir(folder);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function buildPackage(pkg: any, outDir: string): Promise<void> {
  await promises.writeFile(
    resolve(outDir, 'package.json'),
    JSON.stringify({
      ...pkg,
      name: pkg.name + '-layer',
      description: 'layer for ' + pkg.name,
      scripts: undefined,
      devDependencies: undefined
    })
  );
}

export async function buildLayer({
  pkgJsonPath,
  pathToDist
}: {
  pkgJsonPath: string;
  pathToDist?: string;
}): Promise<void> {
  const pkgPath = pkgJsonPath.endsWith('package.json')
    ? pkgJsonPath
    : resolve(pkgJsonPath, 'package.json');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require(pkgPath);

  const dist = pathToDist?.length ? pathToDist : resolve(process.cwd(), 'dist');
  const folders = [dist, resolve(dist, 'layer'), resolve(dist, 'layer', 'nodejs')];
  const outputDir = folders[folders.length - 1];

  await buildFolders(folders);
  await buildPackage(pkg, outputDir);
  await exec(`cd ${outputDir} && npm i --only=prod --no-package-lock`);
}

if (require.main === module) {
  const [, , pkgJsonPath, pathToDist] = process.argv;
  buildLayer({ pkgJsonPath, pathToDist }).then(() => console.log('layer built'));
}
