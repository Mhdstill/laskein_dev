import { UserBoxTypeEnum } from 'data/enum/UserBoxType.enum';
import BoxDTO from './Box.dto';
import UserDTO from './User.dto';

export default interface UserBoxDTO {
  id?: string;
  type?: UserBoxTypeEnum;
  userId?: string;
  user?: UserDTO;
  boxId?: string;
  box?: BoxDTO;
  duration?: string;
  isPlayed?: boolean;
  playedDate?: string;
  lot?: number;
}
