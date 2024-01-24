import { Dispatch } from '@reduxjs/toolkit';
import { reloadBannerList } from 'services/redux/advertissment/banner/imageSlice';
import { v4 as uuidv4 } from 'uuid';

const autoUpdateListBanner = (dispatch: Dispatch) => {
  const uniqueId = uuidv4();
  dispatch(reloadBannerList(uniqueId));
};

export default autoUpdateListBanner;
