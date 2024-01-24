import BannerImageDTO from 'data/dto/BannerImage.dto';

export interface BannerImageInitialState {
  bannerImageList: BannerImageDTO[];
  bannerImage: BannerImageDTO;
  isEditing: boolean;
  loading: boolean;
  reloadBanner: string;
  [key: string]: any;
}
