import { Dispatch } from '@reduxjs/toolkit';
import { reloadNewsLetterList } from 'services/redux/newsLetter/newsLetterSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListNewsLetter = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadNewsLetterList(uniqueId));
};

export default autoUpdateListNewsLetter;
