import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../../utils/axios';

export const editProvider = createAsyncThunk(
  'provider/edit',
  async (data: { id?: string; args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get(`/provider/${data.id}`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
