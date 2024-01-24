import { createAsyncThunk } from '@reduxjs/toolkit';
import RewardLevelDTO from 'data/dto/RewardLevel.dto';
import axiosInstance from 'utils/axios';

export const createRewardLevel = createAsyncThunk(
  'reward-level/create',
  async (data: RewardLevelDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/reward-level', data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
