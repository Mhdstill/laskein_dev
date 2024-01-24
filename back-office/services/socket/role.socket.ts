import { Dispatch } from '@reduxjs/toolkit';
import { reloadRoleList } from 'services/redux/role/modelsSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListRole = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadRoleList(uniqueId));
};

export default autoUpdateListRole;
