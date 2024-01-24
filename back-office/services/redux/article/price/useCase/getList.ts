import { Prisma } from '@prisma/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../../utils/axios';

export const getPriceList = createAsyncThunk(
  'price/getList',
  async (data: { args?: Prisma.PriceArgs }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get('/price/', { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
