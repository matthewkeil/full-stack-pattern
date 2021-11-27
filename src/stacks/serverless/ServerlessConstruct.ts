import { nanoid } from 'nanoid';
import { Construct, CustomResource } from '@aws-cdk/core';
import { AssetCode, LayerVersion } from '@aws-cdk/aws-lambda';
import { Api, ApiProps } from '../../constructs/Api';
import { Tables, TablesProps } from '../../constructs/Tables';
import { Lambdas, LambdasProps } from '../../constructs/Lambdas';
import { ConfigFileProps } from '../../../providers/configFileProvider';

export interface ServerlessConstructProps
  extends ApiProps,
    Pick<TablesProps, 'tables'>,
    Omit<LambdasProps, 'tables' | 'prefix'> {
  configFile?: ConfigFileProps & {
    serviceToken: string;
  };
}

export class ServerlessConstruct extends Construct {
  public lambdas?: Lambdas;
  public tables?: Tables;
  public api?: Api;

  private layers?: LayerVersion[];

  constructor(scope: Construct, id: string, private props: ServerlessConstructProps) {
    super(scope, id);
    this.api = new Api(this, 'Api', props);

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

    if (this.props.configFile) {
      const configFileProps = this.props.configFile;
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      delete configFileProps.serviceToken;
      new CustomResource(this, 'ConfigFile', {
        serviceToken: this.props.configFile.serviceToken,
        resourceType: 'Custom::ConfigFile',
        properties: {
          ...configFileProps,
          IDEMOPOTENCY_TOKEN: Date.now() // makes sure config file is updated
        }
      });
    }
  }
}
