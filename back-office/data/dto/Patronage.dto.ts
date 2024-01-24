import UserDTO from './User.dto';

export default interface PatronageDTO {
  id: string;
  gainPercentage: number;
  discountPercentage: number;
  bonusEndDate: Date;
  userParentId?: string;
  userParent?: UserDTO;
  userChildId?: string;
  userChild?: UserDTO;
}
