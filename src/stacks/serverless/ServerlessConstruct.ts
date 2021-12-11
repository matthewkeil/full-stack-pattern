import { nanoid } from 'nanoid';
import { Construct } from '@aws-cdk/core';
import { AssetCode, LayerVersion } from '@aws-cdk/aws-lambda';
import { Api, ApiProps } from '../../constructs/Api';
import { ICertificate } from '@aws-cdk/aws-certificatemanager';
import { Tables, TablesProps } from '../../constructs/Tables';
import { Lambdas, LambdasProps } from '../../constructs/Lambdas';
import { CnameRecord, IHostedZone } from '@aws-cdk/aws-route53';
import { BasePathMapping, DomainName, EndpointType } from '@aws-cdk/aws-apigateway';
import { buildUrls } from '../../..';

export interface ServerlessConstructProps
  extends Omit<ApiProps, 'description' | 'domainName'>,
    TablesProps,
    Omit<LambdasProps, 'tables'> {
  /**
   * The url/rootDomain for the HostedZone.  If you don not provide a
   * rootDomain a CoreConstruct will not be created.
   *
   * @example If you are hosting the ui at `www.example.com` and the api
   * at `api.example.com` the rootDomain would be `example.com`  This is
   * similar for branches, such as `dev.api.example.com` and
   * `dev.example.com`.  The rootDomain will still be `example.com`.
   */
  baseDomain?: string;

  /**
   * The api subDomain
   *
   * @default api
   */
  subDomain?: string;

  /**
   * For custom domain names. Required when using a rootDomain.
   */
  certificate?: ICertificate;

  hostedZone?: IHostedZone;
}

export class ServerlessConstruct extends Construct {
  public lambdas?: Lambdas;
  public tables?: Tables;
  public api?: Api;
  public subDomain?: string;
  public domainUrl?: string;

  private layers?: LayerVersion[];

  constructor(scope: Construct, id: string, private props: ServerlessConstructProps) {
    super(scope, id);

    if (this.props.baseDomain) {
      const [url] = buildUrls({
        subDomain: this.props.subDomain ?? 'api',
        stage: this.props.stage,
        baseDomain: this.props.baseDomain
      });
      this.domainUrl = url;
      // const stage = this.props.stage && this.props.stage !== 'prod' ? `${this.props.stage}.` : '';
      // this.subDomain = `${stage}${this.props.subDomain ?? 'api'}`;
      // this.domainUrl = `${this.subDomain}.${this.props.rootDomain}`;
    }

    this.api = new Api(this, 'Api', {
      ...this.props,
      domainName:
        this.props.baseDomain && this.props.certificate
          ? {
              domainName: this.domainUrl as string,
              certificate: this.props.certificate
            }
          : undefined
    });

    if (this.props.tables) {
      this.tables = new Tables(this, 'Tables', {
        prefix: this.props.prefix,
        tables: this.props.tables
      });
    }

    const layers: LayerVersion[] = [];
    if (this.props.layers) {
      for (const layer of this.props.layers) {
        if (layer instanceof LayerVersion) {
          layers.push(layer);
        } else {
          layers.push(
            new LayerVersion(this, `Layer${nanoid()}`, {
              code: new AssetCode(layer)
            })
          );
        }
      }
    }

    if (this.props.lambdas) {
      this.lambdas = new Lambdas(this, 'Lambdas', {
        ...props,
        prefix: this.props.prefix,
        api: this.api,
        tables: this.tables,
        layers: this.layers
      });

      if (!this.lambdas.api) {
        this.node.tryRemoveChild('Api');
        this.api = undefined;
      }
    }

    if (this.api && this.domainUrl) {
      if (!(this.props.hostedZone && this.props.certificate)) {
        throw new Error('You must provide a HostedZone and Certificate to use a custom rootDomain');
      }

      const domainName = new DomainName(this, 'DomainName', {
        domainName: this.domainUrl,
        certificate: this.props.certificate,
        endpointType: EndpointType.EDGE
      });

      new BasePathMapping(this, 'BasePathMapping', {
        domainName,
        restApi: this.api.api
      });

      new CnameRecord(this, 'ApiGatewayRecordSet', {
        zone: this.props.hostedZone,
        recordName: this.domainUrl.replace(new RegExp(`.${this.props.baseDomain}$`, 'i'), ''),
        domainName: domainName.domainNameAliasDomainName
      });
    }
  }
}
