import { createAsyncThunk } from '@reduxjs/toolkit';
import TransactionDTO from 'data/dto/Transaction.dto';
import axiosInstance from '../../../../utils/axios';

export const createTransaction = createAsyncThunk(
  'transaction/create',
  async (data: TransactionDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/transaction', data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
