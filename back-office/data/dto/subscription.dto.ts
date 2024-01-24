import OfferDTO from './Offer.dto';
import UserDTO from './User.dto';

export default interface SubscriptionDTO {
  id: string;
  startDate: string;
  userId?: string;
  user?: UserDTO;
  offerId?: string;
  offer?: OfferDTO;
  autoRenewal?: boolean;
}
