import { createAsyncThunk } from '@reduxjs/toolkit';
import OuterTransactionDTO from 'data/dto/OuterTransaction.dto';
import axiosInstance from '../../../../utils/axios';

export const createOuterTransaction = createAsyncThunk(
  'outerTransaction/create',
  async (data: OuterTransactionDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/outer-transaction', data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
