import { TransactionStatusEnum } from '../enum/TransactionStatus.enum';
import { TransactionTypeEnum } from '../enum/TransactionType.enum';
import UserDTO from './User.dto';

export default interface OuterTransactionDTO {
  id?: string;
  type?: TransactionTypeEnum;
  date?: Date;
  amount?: number;
  status?: TransactionStatusEnum;
  sourceId?: string;
  userId?: string;
  user?: UserDTO;
}
