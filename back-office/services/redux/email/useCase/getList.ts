import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'utils/axios';

export const getEmailList = createAsyncThunk(
  'email/getList',
  async (data: { page?: number; pageSize: number; args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get(
        `/imap?page=${data.pageSize}&pageSize=${data.page}`,
        { params }
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
