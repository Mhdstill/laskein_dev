import TransactionDTO from 'data/dto/Transaction.dto';

export interface TransactionInitialState {
  transactionList: TransactionDTO[];
  transaction: TransactionDTO;
  isEditing: boolean;
  loading: boolean;
  reloadTransactionList?: string;
  [key: string]: any;
}
