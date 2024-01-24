import { BannerDTO } from './banner.interface';

export interface IBannerState {
  allBanner: BannerDTO[];
  isLoading: boolean;
}
