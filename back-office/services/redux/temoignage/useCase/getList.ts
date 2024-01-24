import { createAsyncThunk } from '@reduxjs/toolkit';
import { TemoignageQuery } from 'data/Query/temoignage.query';
import axiosInstance from 'utils/axios';

export const getTemoignageList = createAsyncThunk(
  'temoignage/getList',
  async (data: { args?: TemoignageQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get('/temoignage', { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
