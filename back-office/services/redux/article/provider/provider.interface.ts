import ProviderDTO from '../../../../data/dto/Provider.dto';

export interface ProviderInitialState {
  providerList: ProviderDTO[];
  pinnedProviders: ProviderDTO[];
  provider: ProviderDTO;
  isEditing: boolean;
  loading: boolean;
  reloadProvider: string;
  [key: string]: any;
}
