import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchConnectedUser } from './fetchConnectedUser';

export const relogedConnectedUser = createAsyncThunk(
  'auth/relodConnectedUser',
  /* eslint-disable */
  async (data, thunkAPI) => {
    try {
      await thunkAPI.dispatch(fetchConnectedUser()).unwrap();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
