import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../utils/axios';

/**
 * Fetch new access & refresh token
 */
export const fetchNewAccesTokenRefreshToken = createAsyncThunk(
  'auth/fetchNewAccesTokenRefreshToken',
  /* eslint-disable */
  async (data, thunkAPI) => {
    try {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${localStorage.getItem('rf')}`;
      const response = await axios.get('/auth/refresh');
      localStorage.setItem('at', response.data.access_token);
      localStorage.setItem('rf', response.data.refresh_token);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
