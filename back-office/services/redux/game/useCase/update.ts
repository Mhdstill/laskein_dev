import { createAsyncThunk } from '@reduxjs/toolkit';
import GameDTO from 'data/dto/Game.dto';
import axiosInstance from 'utils/axios';

export const updateGame = createAsyncThunk(
  'game/update',
  async (data: { id: string; game: GameDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/game/${data.id}`, data.game);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
