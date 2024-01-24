import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../../utils/axios';

export const getBannerImageList = createAsyncThunk(
  'bannerImage/getList',
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get('/banner-image', { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
