import { createAsyncThunk } from '@reduxjs/toolkit';
import BoxParamsDTO from 'data/dto/BoxParams.dto';
import axiosInstance from 'utils/axios';

export const editBoxParams = createAsyncThunk(
  'boxParams/edit',
  async (data: { id?: string; args?: BoxParamsDTO }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get(`/box-params/${data.id}`, {
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
