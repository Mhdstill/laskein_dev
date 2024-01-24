import { createAsyncThunk } from '@reduxjs/toolkit';
import GameDTO from 'data/dto/Game.dto';
import axiosInstance from 'utils/axios';

export const createGame = createAsyncThunk(
  'game/create',
  async (data: GameDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/game', data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
