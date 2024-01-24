import { Dispatch } from '@reduxjs/toolkit';
import { reloadModelList } from 'services/redux/model/modelsSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListModel = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadModelList(uniqueId));
};

export default autoUpdateListModel;
