import { createAsyncThunk } from '@reduxjs/toolkit';
import { HistoricalQuery } from 'data/Query/historical.query';
import axiosInstance from 'utils/axios';

export const getHistorical = createAsyncThunk(
  'historical/get',
  async (data: { id: string; args?: HistoricalQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get(`/historical/${data.id}`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
