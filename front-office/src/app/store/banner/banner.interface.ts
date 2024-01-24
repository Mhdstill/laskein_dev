export interface BoxDTO {
  id: string;
  reference: string;
  name: string;
  price: number;
  number: 0;
  description: string;
  badge: string;
  boxParams: IBoxParams;
}

export interface IBoxParams {
  id: string;
  isBestSelling: boolean;
  isRecommended: boolean;
  isNew: boolean;
  isBigPrice: boolean;
  isSubsciptionBonus: boolean;
  boxId: string;
}

export interface BannerDTO {
  id: string;
  bannerImgUrl: string;
  bannerLink: string;
  type: BannerType;
  boxId: string;
}

export enum BannerType {
  WELCOME = 'WELCOME',
  SUBSCRIPTION = 'SUBSCRIPTION',
  SPONSORSHIP = 'SPONSORSHIP',
  ADVERTISEMENT = 'ADVERTISEMENT',
}
