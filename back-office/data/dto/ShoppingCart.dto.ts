import ArticleDTO from './Article.dto';
import GameDTO from './Game.dto';
import UserDTO from './User.dto';

export default interface ShoppingCartDTO {
  id: string;
  winningDate?: Date;
  userId?: string;
  user?: UserDTO;
  articleId?: string;
  article?: ArticleDTO;
  game?: GameDTO;
}
