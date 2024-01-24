import { createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionQuery } from 'data/Query/transaction.query';
import axiosInstance from '../../../../utils/axios';

export const getTransactionList = createAsyncThunk(
  'transaction/getList',
  async (data: { args?: TransactionQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get('/transaction', { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
