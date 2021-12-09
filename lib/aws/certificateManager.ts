import { config, ACM, SharedIniFileCredentials } from 'aws-sdk';
import { normalizeDomain } from '../normalizeDomain';

export async function getCertArnForDomain({
  domain,
  profile,
  region = process.env.REGION ?? 'us-east-1'
}: {
  region?: string;
  profile?: string;
  domain: string;
}) {
  if (profile) {
    config.credentials = new SharedIniFileCredentials({ profile });
  } else {
    config.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ''
    };
  }
  const acm = new ACM({ region });
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
    ({ DomainName }) =>
      normalizeDomain(DomainName).includes(normalizeDomain(domain)) ||
      normalizeDomain(domain).includes(normalizeDomain(DomainName))
  );

  return certInfo?.CertificateArn;
}
