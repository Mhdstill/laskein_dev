import { Dispatch } from '@reduxjs/toolkit';
import { reloadHistoricalList } from 'services/redux/historical/historicalSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListHistorical = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadHistoricalList(uniqueId));
};

export default autoUpdateListHistorical;
