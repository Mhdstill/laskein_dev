import { Dispatch } from '@reduxjs/toolkit';
import { reloadOfferList } from 'services/redux/abonnement/offer/modelsSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListOffer = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadOfferList(uniqueId));
};

export default autoUpdateListOffer;
