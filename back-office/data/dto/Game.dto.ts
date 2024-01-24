import { GameStatusEnum } from 'data/enum/GameStatus.enum';
import { GameTypeEnum } from 'data/enum/GameType.enum';
import { GameVersionEnum } from 'data/enum/GameVersion.enum';
import ArticleDTO from './Article.dto';
import PatronageDTO from './Patronage.dto';
import ShoppingCartDTO from './ShoppingCart.dto';
import TransactionDTO from './Transaction.dto';
import UserBoxDTO from './UserBox.dto';

export default interface GameDTO {
  id?: string;
  reference: string;
  startDate: string;
  endDate: string;
  status: GameStatusEnum;
  version: GameVersionEnum;
  type: GameTypeEnum;
  userBox?: UserBoxDTO;
  userBoxId: string;
  patronage?: PatronageDTO;
  patronageId?: string;
  gainPercentage?: number;
  gainDraw?: number;
  article?: ArticleDTO;
  articleId?: string;
  shoppingCart?: ShoppingCartDTO;
  transaction?: TransactionDTO;
  createdAt?: string;
  updatedAt?: string;
}
