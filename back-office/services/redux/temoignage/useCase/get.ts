import { createAsyncThunk } from '@reduxjs/toolkit';
import { TemoignageQuery } from 'data/Query/temoignage.query';
import axiosInstance from 'utils/axios';

export const getTemoignage = createAsyncThunk(
  'temoignage/get',
  async (data: { id: string; args?: TemoignageQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get(`/temoignage/${data.id}`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
