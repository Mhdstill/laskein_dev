import ArticleDTO from './Article.dto';
import { OrderEnum } from './Order.enum';
import ShoppingCartDTO from './ShoppingCart.dto';

export default interface OrderDTO {
  id?: string;
  status?: OrderEnum;
  followedLink?: string;
  orderNumber?: string;
  shoppingCardId?: string;
  shoppingCart?: ShoppingCartDTO;
  article?: ArticleDTO;
  createdAt?: string;
  updatedAt?: string;
}
