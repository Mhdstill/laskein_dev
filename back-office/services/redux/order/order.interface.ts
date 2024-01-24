import OrderDTO from 'data/dto/Order.dto';

export interface OrderInitialState {
  orderList: OrderDTO[];
  order: OrderDTO;
  isEditing: boolean;
  loading: boolean;
  activeUi: 'list' | 'form' | 'details' | 'none';
  [key: string]: any;
  reloadOrder: string;
}
