import { createAsyncThunk } from '@reduxjs/toolkit';
import { HistoricalQuery } from 'data/Query/historical.query';
import axiosInstance from 'utils/axios';

export const getHistoricalList = createAsyncThunk(
  'historical/getList',
  async (data: { args?: HistoricalQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get('/historical', { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
