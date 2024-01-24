import { createAsyncThunk } from '@reduxjs/toolkit';
import { SubscriptionQuery } from 'data/Query/subscription.query';
import axiosInstance from 'utils/axios';

export const getSubscriptionList = createAsyncThunk(
  'subscription/getList',
  async (data: { args?: SubscriptionQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get('/subscription', { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
