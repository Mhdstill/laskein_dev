import { Dispatch } from '@reduxjs/toolkit';
import { reloadOrderList } from 'services/redux/order/orderSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListOrder = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadOrderList(uniqueId));
};

export default autoUpdateListOrder;
