import ArticleDTO from './Article.dto';

export default interface ProductPhotoDTO {
  id: string;
  productUrl: string;
  article: ArticleDTO;
}
