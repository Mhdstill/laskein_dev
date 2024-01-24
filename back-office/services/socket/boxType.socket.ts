import { Dispatch } from '@reduxjs/toolkit';
import { reloadBoxTypeList } from 'services/redux/box/type/boxTypeSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListBoxType = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadBoxTypeList(uniqueId));
};

export default autoUpdateListBoxType;
