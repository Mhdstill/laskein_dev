import UserDTO from 'data/dto/User.dto';

export interface MemberInitialState {
  memberList: UserDTO[];
  member: UserDTO;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
  reloadMember: string;
}
