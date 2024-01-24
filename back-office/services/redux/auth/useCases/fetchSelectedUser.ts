import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../utils/axios';

export const fetchSelectedUser = createAsyncThunk(
  'user/fetchSelectedUser',
  async (args: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/user/${args.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response);
      }
    }
  }
);
