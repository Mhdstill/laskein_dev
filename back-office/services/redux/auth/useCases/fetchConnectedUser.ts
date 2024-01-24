import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../utils/axios';

/**
 * Fetch the connected user and set it to the state
 */
export const fetchConnectedUser = createAsyncThunk(
  'auth/getConnectedUser',
  async (data, thunkAPI) => {
    try {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${localStorage.getItem('at')}`;
      const response = await axios.get('/auth/me');
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
