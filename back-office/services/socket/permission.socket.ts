import { Dispatch } from '@reduxjs/toolkit';
import { reloadPermissionList } from 'services/redux/permission/modelsSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListPermission = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadPermissionList(uniqueId));
};

export default autoUpdateListPermission;
