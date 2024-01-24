import { Dispatch } from '@reduxjs/toolkit';
import { reloadBoxParamsList } from 'services/redux/boxParams/boxParamsSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListBoxParams = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadBoxParamsList(uniqueId));
};

export default autoUpdateListBoxParams;
