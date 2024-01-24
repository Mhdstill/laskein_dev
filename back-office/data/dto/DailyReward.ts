import BoxDTO from './Box.dto';

export default interface DailyRewardDTO {
  id?: string;
  number: number;
  boxId: string;
  box?: BoxDTO;
  createdAt?: Date;
  updatedAt?: Date;
}
