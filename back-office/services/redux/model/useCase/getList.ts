import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios';

export const getModelsList = createAsyncThunk(
  'models/getList',
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get('/models', { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
