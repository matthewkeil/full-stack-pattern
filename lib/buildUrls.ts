import { toKebab } from './changeCase';

function urlSafe(stage: string): string {
  return toKebab(stage.replace(/[^a-zA-Z0-9_-]*/g, ''));
}

export function buildUrls({
  stage = 'prod',
  subDomain,
  baseDomain: baseDomain,
  buildWwwSubdomain = true
}: {
  baseDomain: string;
  subDomain: string;
  stage?: string;
  buildWwwSubdomain?: boolean;
}) {
  if (stage === 'prod') {
    const serviceAddress = `${subDomain}.${baseDomain}`;
    if (subDomain === 'www') {
      if (buildWwwSubdomain) {
        // return ['www.example.com', 'example.com'];
        return [serviceAddress, baseDomain] as [string, string];
      }
      // return ['example.com'];
      return [baseDomain] as [string];
    }
    // return ['auth.example.com'];
    return [serviceAddress] as [string];
  }
  // return ['dev.api.example.com', 'api.example.com'];
  return [`${urlSafe(stage)}.${subDomain}.${baseDomain}`] as [string];
}
