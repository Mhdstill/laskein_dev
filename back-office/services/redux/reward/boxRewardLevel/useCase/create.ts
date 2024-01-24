import { createAsyncThunk } from '@reduxjs/toolkit';
import BoxRewardLevelDTO from 'data/dto/BoxRewardLevel.dto';
import axiosInstance from 'utils/axios';

export const createBoxRewardLevel = createAsyncThunk(
  'box-reward-level/create',
  async (data: BoxRewardLevelDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/box-reward-level', data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
