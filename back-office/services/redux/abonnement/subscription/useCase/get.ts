import { createAsyncThunk } from '@reduxjs/toolkit';
import { SubscriptionQuery } from 'data/Query/subscription.query';
import axiosInstance from 'utils/axios';

export const getSubscription = createAsyncThunk(
  'subscription/get',
  async (data: { id: string; args?: SubscriptionQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get(`/subscription/${data.id}`, {
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
