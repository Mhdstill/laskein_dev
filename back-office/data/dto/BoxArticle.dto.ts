import ArticleDTO from './Article.dto';
import BoxDTO from './Box.dto';

export default interface BoxArticleDTO {
  id?: string;
  boxId?: string;
  articleId?: string;
  winningChance?: number;
  box?: BoxDTO;
  article?: ArticleDTO;
}
