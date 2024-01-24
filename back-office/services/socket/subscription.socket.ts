import { Dispatch } from '@reduxjs/toolkit';
import { reloadSubscriptionList } from 'services/redux/abonnement/subscription/historicalSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListSubscription = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadSubscriptionList(uniqueId));
};

export default autoUpdateListSubscription;
