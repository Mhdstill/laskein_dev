import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../../utils/axios';

export const getBannerImage = createAsyncThunk(
  'bannerImage/get',
  async (data: { id: string; args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get(`/banner-image/${data.id}`, {
        params,
      });
      if (Array.isArray(response.data)) {
        return response.data[0];
      } else {
        return response.data;
      }
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
