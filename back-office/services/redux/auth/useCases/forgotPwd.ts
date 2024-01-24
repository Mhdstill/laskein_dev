import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../utils/axios';
import { logout } from './logout';

export const forgotPwd = createAsyncThunk(
  'auth/forgotPwd',
  async (data: { email: string; url: string }, thunkAPI) => {
    try {
      const response = await axios.post('/auth/reset-password', data);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      thunkAPI.dispatch(logout());
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
