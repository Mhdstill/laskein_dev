import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../utils/axios';
import { enqueueSnackbar } from '../../notification/notificationSlice';

export const logout = createAsyncThunk(
  'auth/logout',
  async (data, thunkAPI) => {
    try {
      await axios.get('/auth/logout');
      localStorage.removeItem('at');
      localStorage.removeItem('rf');
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Déconnexion',
          options: {
            variant: 'success',
          },
        })
      );
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
