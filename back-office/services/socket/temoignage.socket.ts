import { Dispatch } from '@reduxjs/toolkit';
import { reloadTemoignageList } from 'services/redux/temoignage/subCategorySlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListTemoignage = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadTemoignageList(uniqueId));
};

export default autoUpdateListTemoignage;
