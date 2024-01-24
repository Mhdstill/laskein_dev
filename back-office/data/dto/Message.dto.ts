import RoomDTO from './Room.dto';
import UserDTO from './User.dto';

export default interface MessageDTO {
  id: string;
  message: string;
  sendingDate: Date;
  sender: UserDTO;
  room: RoomDTO;
}
