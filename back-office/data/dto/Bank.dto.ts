import TransactionDTO from './Transaction.dto';

export default interface BankDTO {
  id: string;
  name: string;
  accountNumber: string;
  transaction: TransactionDTO;
}
