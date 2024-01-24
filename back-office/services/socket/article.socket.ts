import { Dispatch } from '@reduxjs/toolkit';
import { reloadArticleList } from 'services/redux/article/_/articleSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListArticle = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadArticleList(uniqueId));
};

export default autoUpdateListArticle;
