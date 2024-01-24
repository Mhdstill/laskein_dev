import AddressDTO from './Address.dto';
import RuleDTO from './Rule.dto';
import WalletDTO from './Wallet.dto';
import SubscriptionDTO from './subscription.dto';

export default interface UserDTO {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
  email?: string;
  isActif?: boolean;
  isMember?: boolean;
  isAdmin?: boolean;
  emailIsVerified?: boolean;
  twoAuthIsActive?: boolean;
  phone?: string;
  password?: string;
  refreshToken?: string;
  supportingDocumentUrl?: string;
  isValideSupportingDocument?: boolean;
  registrationBonus?: number;
  latestConnectedDate?: Date;
  address?: AddressDTO;
  ruleId?: string;
  rule?: RuleDTO;
  signInCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  socketId?: string;
  wallet?: WalletDTO;
  subscription?: SubscriptionDTO;
  [x: string]: any;
}
