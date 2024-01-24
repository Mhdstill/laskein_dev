import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'utils/axios';

export const deleteDailyReward = createAsyncThunk(
  'daily-reward/delete',
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/daily-reward/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
