import { createAsyncThunk } from '@reduxjs/toolkit';
import BoxRewardLevelDTO from 'data/dto/BoxRewardLevel.dto';
import axiosInstance from 'utils/axios';

export const updateBoxRewardLevel = createAsyncThunk(
  'box-reward-level/update',
  async (data: { id: string; boxRewardLevel: BoxRewardLevelDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/box-reward-level/${data.id}`,
        data.boxRewardLevel
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
