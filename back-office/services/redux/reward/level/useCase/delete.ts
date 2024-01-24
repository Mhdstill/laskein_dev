import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'utils/axios';

export const deleteRewardLevel = createAsyncThunk(
  'reward-level/delete',
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/reward-level/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
