import { createAsyncThunk } from '@reduxjs/toolkit';
import { PatronageQuery } from 'data/Query/patronage.query';
import axiosInstance from 'utils/axios';

export const getPatronageList = createAsyncThunk(
  'patronage/getList',
  async (data: { args?: PatronageQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get('/patronage', { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
