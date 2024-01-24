import ArticleDTO from './Article.dto';

export default interface PriceDTO {
  id?: string;
  reference?: string;
  currentPrice: number;
  oldPrice?: number;
  rate?: number;
  reduction?: number;
  sellingPrice?: number;
  articleId?: string;
  article?: ArticleDTO;
}
