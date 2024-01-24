import { Dispatch } from '@reduxjs/toolkit';
import { reloadProviderList } from 'services/redux/article/provider/providerSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListProvider = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadProviderList(uniqueId));
};

export default autoUpdateListProvider;
