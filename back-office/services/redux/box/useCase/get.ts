import { createAsyncThunk } from '@reduxjs/toolkit';
import { BoxQuery } from 'data/Query/box.query';
import axiosInstance from '../../../../utils/axios';

export const getBox = createAsyncThunk(
  'box/get',
  async (data: { id: string; args?: BoxQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get(`/box/${data.id}`, {
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
