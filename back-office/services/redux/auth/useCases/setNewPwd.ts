import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../utils/axios';
import { logout } from './logout';

export const setNewPwd = createAsyncThunk(
  'auth/setNewPwd',
  async (data: { password: string; token: string }, thunkAPI) => {
    try {
      const response = await axios.post(
        '/auth/set-new-password',
        {
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
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
