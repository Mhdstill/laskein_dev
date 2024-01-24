import { Dispatch } from '@reduxjs/toolkit';
import { reloadCategoryList } from 'services/redux/article/category/categorySlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListCategory = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadCategoryList(uniqueId));
};

export default autoUpdateListCategory;
