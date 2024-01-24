import { Dispatch } from '@reduxjs/toolkit';
import { reloadPostList } from 'services/redux/post/postSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListPost = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadPostList(uniqueId));
};

export default autoUpdateListPost;
