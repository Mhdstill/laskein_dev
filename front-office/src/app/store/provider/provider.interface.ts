export interface ProviderDTO {
  id: string;
  reference: string;
  companyName: string;
  address: string;
  phone: string;
  webSite: string;
  logo: string;
  isPinned: boolean;
  article: ArticleDTO[];
}

export interface ArticleDTO {
  id: string;
  providerId: string;
  provider: ProviderDTO;
  boxArticle: BoxArticleDTO[];
}

export interface BoxArticleDTO {
  id: string;
  winningChance: number;
  boxId: string;
  box: IBox;
  articleId: string;
  article: ArticleDTO;
}

export interface IBox {
  id: string;
  reference: string;
  name: string;
  price: number;
  number: 0;
  description: string;
  badge: string;
}
