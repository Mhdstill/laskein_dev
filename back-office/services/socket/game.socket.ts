import { Dispatch } from '@reduxjs/toolkit';
import { reloadGameList } from 'services/redux/game/gameSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateGameList = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadGameList(uniqueId));
};

export default autoUpdateGameList;
