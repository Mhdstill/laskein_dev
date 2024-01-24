import { createAsyncThunk } from '@reduxjs/toolkit';
import OuterTransactionDTO from 'data/dto/OuterTransaction.dto';
import axiosInstance from '../../../../utils/axios';

export const updateOuterTransaction = createAsyncThunk(
  'outerTransaction/update',
  async (data: { id: string; transaction: OuterTransactionDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/outer-transaction/confirm/${data.id}`,
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
