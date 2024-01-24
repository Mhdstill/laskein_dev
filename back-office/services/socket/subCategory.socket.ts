import { Dispatch } from '@reduxjs/toolkit';
import { reloadSubCategoryList } from 'services/redux/article/sub-category/subCategorySlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListSubCategory = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadSubCategoryList(uniqueId));
};

export default autoUpdateListSubCategory;
