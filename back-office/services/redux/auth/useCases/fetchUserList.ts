import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../utils/axios';

export const fetchUserList = createAsyncThunk(
  'user/fetchUserList',
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get('/user/', { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
