import { Dispatch } from '@reduxjs/toolkit';
import { reloadOuterTransactionList } from 'services/redux/outerTransation/outerTransactionSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateOuterTransactionList = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadOuterTransactionList(uniqueId));
};

export default autoUpdateOuterTransactionList;
