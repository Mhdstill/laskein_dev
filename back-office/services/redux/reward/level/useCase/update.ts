import { createAsyncThunk } from '@reduxjs/toolkit';
import RewardLevelDTO from 'data/dto/RewardLevel.dto';
import axiosInstance from 'utils/axios';

export const updateRewardLevel = createAsyncThunk(
  'reward-level/update',
  async (data: { id: string; rewardLevel: RewardLevelDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/reward-level/${data.id}`,
        data.rewardLevel
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
