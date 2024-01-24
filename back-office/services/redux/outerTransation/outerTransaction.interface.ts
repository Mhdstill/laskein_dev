import OuterTransactionDTO from 'data/dto/OuterTransaction.dto';

export interface OuterTransactionInitialState {
  outerTransactionList: OuterTransactionDTO[];
  outerTransaction: OuterTransactionDTO;
  isEditing: boolean;
  loading: boolean;
  reloadOuterTransactionList?: string;
  [key: string]: any;
}
