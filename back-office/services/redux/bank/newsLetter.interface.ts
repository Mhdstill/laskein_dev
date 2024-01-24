import BankDTO from 'data/dto/Bank.dto';

export interface BankInitialState {
  bankList: BankDTO[];
  bank: BankDTO;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
