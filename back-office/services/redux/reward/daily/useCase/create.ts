import { createAsyncThunk } from '@reduxjs/toolkit';
import DailyRewardDTO from 'data/dto/DailyReward';
import axiosInstance from 'utils/axios';

export const createDailyReward = createAsyncThunk(
  'daily-reward/create',
  async (data: DailyRewardDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/daily-reward', data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
