import { createAsyncThunk } from '@reduxjs/toolkit';
import { BoxParamsQuery } from 'data/Query/boxParams.query';
import axiosInstance from 'utils/axios';

export const getBoxParamsList = createAsyncThunk(
  'boxParams/getList',
  async (data: { args?: BoxParamsQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get('/box-params', { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
