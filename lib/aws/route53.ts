import { config, SharedIniFileCredentials, Route53 } from 'aws-sdk';
import { normalizeDomain } from '../normalizeDomain';
import { getCredentials } from './getCredentials';

export const getHostedZoneIdForDomain = async ({
  profile,
  region,
  rootDomain
}: {
  profile?: string;
  region?: string;
  rootDomain: string;
}): Promise<string | undefined> => {
  const credentials = await getCredentials({ profile });
  const route53 = new Route53({ region, credentials });
  const hostedZone = await route53.listHostedZonesByName({ DNSName: rootDomain }).promise();
  const { Id } =
    hostedZone.HostedZones.find(
      ({ Name }) =>
        normalizeDomain(Name).includes(normalizeDomain(rootDomain)) ||
        normalizeDomain(rootDomain).includes(normalizeDomain(Name))
    ) || {};
  return Id ? Id.split('/')[2] : undefined;
};
