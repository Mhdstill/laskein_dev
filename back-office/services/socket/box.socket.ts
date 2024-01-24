import { Dispatch } from '@reduxjs/toolkit';
import { reloadBoxList } from 'services/redux/box/boxSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListBox = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadBoxList(uniqueId));
};

export default autoUpdateListBox;
