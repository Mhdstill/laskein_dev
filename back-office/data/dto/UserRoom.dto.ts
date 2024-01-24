import RoomDTO from './Room.dto';
import UserDTO from './User.dto';

export default interface UserRoomDTO {
  user: UserDTO;
  room: RoomDTO;
}
