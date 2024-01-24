import OfferDTO from 'data/dto/Offer.dto';

export interface OfferInitialState {
  offerList: OfferDTO[];
  offer: OfferDTO;
  isEditing: boolean;
  loading: boolean;
  reloadOffer: string;
  [key: string]: any;
}
