import { ACM } from 'aws-sdk';
import { normalizeDomain } from '../normalizeDomain';
import { getCredentials } from './getCredentials';

export async function getCertArnForDomain({
  baseDomain,
  profile,
  region
}: {
  region: string;
  profile?: string;
  baseDomain: string;
}) {
  const credentials = await getCredentials({ profile });
  const acm = new ACM({ region, credentials });
  let Token: string | undefined;
  const certList = [];
  do {
    const { NextToken, CertificateSummaryList = [] } = await acm
      .listCertificates({
        NextToken: Token,
        CertificateStatuses: ['PENDING_VALIDATION', 'ISSUED'],
        Includes: {
          extendedKeyUsage: ['TLS_WEB_SERVER_AUTHENTICATION', 'TLS_WEB_CLIENT_AUTHENTICATION']
        }
      })
      .promise();
    Token = NextToken;
    certList.push(...CertificateSummaryList);
  } while (Token);

  const certInfo = certList.find(
    ({ DomainName }) => normalizeDomain(DomainName) === normalizeDomain(baseDomain)
    // normalizeDomain(DomainName).includes(normalizeDomain(domain)) ||
    // normalizeDomain(domain).includes(normalizeDomain(DomainName))
  );

  return certInfo?.CertificateArn;
}
