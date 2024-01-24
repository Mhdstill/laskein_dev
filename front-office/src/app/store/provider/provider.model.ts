import { ProviderDTO } from './provider.interface';

export interface IProviderState {
  allProvider: ProviderDTO[];
  isLoading: boolean;
}
