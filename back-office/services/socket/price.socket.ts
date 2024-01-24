import { Dispatch } from '@reduxjs/toolkit';
import { reloadPriceList } from 'services/redux/article/price/priceSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListPrice = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadPriceList(uniqueId));
};

export default autoUpdateListPrice;
