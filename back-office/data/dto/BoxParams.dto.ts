import BoxDTO from './Box.dto';

export default interface BoxParamsDTO {
  id?: string;
  box?: BoxDTO;
  boxId: string;
  isBestSelling?: boolean;
  isRecommended?: boolean;
  isNew?: boolean;
  isBigPrice?: boolean;
  isSubscriptionBonus?: boolean;
}
