import { createAsyncThunk } from '@reduxjs/toolkit';
import { BoxImageQuery } from 'data/Query/boxImage.query';
import axiosInstance from '../../../../../utils/axios';

export const getBoxImageList = createAsyncThunk(
  'boxImage/getList',
  async (data: { args?: BoxImageQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get('/box-image', { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
