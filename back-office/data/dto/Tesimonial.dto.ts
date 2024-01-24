import UserDTO from './User.dto';

export default interface TestimonialDTO {
  id?: string;
  comment?: string;
  rating: number;
  commentDate: Date;
  isToShow: boolean;
  userId?: string;
  user?: UserDTO;
}
