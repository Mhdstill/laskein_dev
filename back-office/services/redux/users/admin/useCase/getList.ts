import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserQuery } from 'data/Query/user.query';
import axiosInstance from '../../../../../utils/axios';

export const getUtilisateurList = createAsyncThunk(
  'utilisateur/getList',
  async (data: { args?: UserQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get('/user', { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
