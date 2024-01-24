import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrderQuery } from 'data/Query/order.query';
import axiosInstance from 'utils/axios';

export const getOffer = createAsyncThunk(
  'offer/get',
  async (data: { id: string; args?: OrderQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get(`/offer/${data.id}`, {
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
