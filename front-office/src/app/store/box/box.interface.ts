export interface IBox {
  id: string;
  reference: string;
  name: string;
  price: number;
  number: 0;
  description: string;
  badge: string;
  boxType: IBoxType;
  boxParams: IBoxParams;
  boxImage: IBoxImage[];
  article: ArticleDTO[];
  boxArticle: BoxArticleDTO[];
  photoUrl: string;
}

export interface UserBoxDTO {
  id: string;
  // userId: UserDTO;
  boxId: string;
  box?: IBox;
  isPlayed: boolean;
  isLocked?: boolean;
  type?: string;
  playedDate: string;
}

export interface IBoxImage {
  id: string;
  photoUrl: string;
  status: BoxStatus;
}

export interface PurchaseDTO {
  boxId: string;
  message?: string;
}

export interface IBoxType {
  id: string;
  reference: string;
  name: string;
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

export interface BoxArticleDTO {
  id: string;
  winningChance: number;
  box: IBox;
  article: ArticleDTO;
}

export interface ArticleDTO {
  id: string;
  reference: string;
  designation: string;
  size: string;
  observation: string;
  articlePhoto: ArticlePhotoDTO[];
  price: PriceDTO;
  provider: ProviderDTO;
}
export interface ProviderDTO {
  id: string;
}
export interface PriceDTO {
  id: string;
  reference: string;
  currentPrice: number;
  oldPrice: number;
  rate: number;
  sellingPrice: number;
  reduction: number;
}

export interface ArticlePhotoDTO {
  id: string;
  photoUrl: string;
  status: ArticleStatus;
}

export enum StoreBoxFiltering {
  BY_NAME,
  PRICE_INTERVAL,
  PRICE_DESCENDING,
  PRICE_ASCENDING,
  LESS_THAN_X_PRICE,
  GREATER_THAN_X_PRICE,
  BEST_SELLING,
  IS_NEW,
}

export enum BoxStatus {
  CLOSED = 'CLOSED',
  OPENED = 'OPENED',
  PLAYING = 'PLAYING',
  OTHER = 'OTHER',
}

export enum ArticleStatus {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
  LAST = 'LAST',
}
