import BoxDTO from './Box.dto';
import OfferDTO from './Offer.dto';

export default interface BannerImageDTO {
  id?: string;
  bannerImgUrl: string;
  bannerLink: string;
  boxId?: string | null;
  type?: string;
  box?: BoxDTO;
  offerId?: string | null;
  offer?: OfferDTO;
}
