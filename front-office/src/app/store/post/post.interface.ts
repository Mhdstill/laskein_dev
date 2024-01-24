export interface PostDTO {
  id: string;
  title: string;
  content: string;
  postUrl: string;
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

export enum ArticleStatus {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
  LAST = 'LAST',
}
