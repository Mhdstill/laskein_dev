import { Dispatch } from '@reduxjs/toolkit';
import { reloadTransactionList } from 'services/redux/transaction/transactionSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateTransactionList = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadTransactionList(uniqueId));
};

export default autoUpdateTransactionList;
