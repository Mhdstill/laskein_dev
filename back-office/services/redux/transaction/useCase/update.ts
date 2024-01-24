import { createAsyncThunk } from '@reduxjs/toolkit';
import TransactionDTO from 'data/dto/Transaction.dto';
import axiosInstance from '../../../../utils/axios';

export const updateTransaction = createAsyncThunk(
  'transaction/update',
  async (data: { id: string; transaction: TransactionDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/transaction/${data.id}`,
        data.transaction
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
