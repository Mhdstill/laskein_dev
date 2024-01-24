import UserDTO from './User.dto';

export default interface WalletDTO {
  id: string;
  balance: number;
  user: UserDTO;
}
