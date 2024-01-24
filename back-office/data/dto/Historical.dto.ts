import ActionDTO from './Action.dto';
import UserDTO from './User.dto';

export default interface HistoricalDTO {
  id?: string;
  user?: UserDTO;
  userId?: string;
  action?: ActionDTO;
  description: string;
  date: Date;
}
