import { createAsyncThunk } from '@reduxjs/toolkit';
import DailyRewardDTO from 'data/dto/DailyReward';
import axiosInstance from 'utils/axios';

export const updateDailyReward = createAsyncThunk(
  'daily-reward/update',
  async (data: { id: string; dailyReward: DailyRewardDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/daily-reward/${data.id}`,
        data.dailyReward
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
