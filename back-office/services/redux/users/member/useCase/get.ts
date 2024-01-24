import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserQuery } from 'data/Query/user.query';
import axiosInstance from '../../../../../utils/axios';

export const getMember = createAsyncThunk(
  'member/get',
  async (data: { id: string; args?: UserQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get(`/user/${data.id}`, {
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
