import { Dispatch } from '@reduxjs/toolkit';
import { reloadUnitySizeList } from 'services/redux/unitySize/modelsSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListUnitySize = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadUnitySizeList(uniqueId));
};

export default autoUpdateListUnitySize;
