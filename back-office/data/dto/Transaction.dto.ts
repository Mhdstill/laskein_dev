import { TransactionStatusEnum } from '../enum/TransactionStatus.enum';
import { TransactionTypeEnum } from '../enum/TransactionType.enum';
import BankDTO from './Bank.dto';
import BoxDTO from './Box.dto';
import ShoppingCartDTO from './ShoppingCart.dto';
import WalletDTO from './Wallet.dto';

export default interface TransactionDTO {
  id?: string;
  type?: TransactionTypeEnum;
  date?: Date;
  amount?: number;
  status?: TransactionStatusEnum;
  boxId?: string;
  box?: BoxDTO;
  shoppingCardId?: string;
  shoppingCard?: ShoppingCartDTO;
  walletId?: string;
  wallet?: WalletDTO;
  bankId?: string;
  bank?: BankDTO;
}
