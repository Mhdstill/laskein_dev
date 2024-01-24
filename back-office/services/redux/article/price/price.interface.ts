import PriceDTO from '../../../../data/dto/Price.dto';

export interface PriceInitialState {
  priceList: PriceDTO[];
  price: PriceDTO;
  isEditing: boolean;
  loading: boolean;
  reloadPrice: string;
  [key: string]: any;
}
