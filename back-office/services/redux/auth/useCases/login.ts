import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../utils/axios';
import { fetchConnectedUser } from './fetchConnectedUser';
import { logout } from './logout';

export const login = createAsyncThunk(
  'auth/login',
  async (
    data: { email: string; password: string; remember: boolean },
    thunkAPI
  ) => {
    try {
      const response = await axios.post('/auth/admin/login', data);
      localStorage.setItem('at', response.data.access_token);
      localStorage.setItem('rf', response.data.refresh_token);
      // if (data.remember) {
      //   localStorage.setItem('rf', response.data.refresh_token);
      // }
      try {
        await thunkAPI.dispatch(fetchConnectedUser()).unwrap();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
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
