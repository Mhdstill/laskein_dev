import { createAsyncThunk } from '@reduxjs/toolkit';
import UserDTO from '../../../../data/dto/User.dto';
import axios from '../../../../utils/axios';

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: { id: string; user: UserDTO }, thunkApi) => {
    try {
      const response = await axios.patch(`/user/${data.id}`, data.user);
      return response.data;
    } catch (error: any) {
      if (error?.response) {
        thunkApi.rejectWithValue(error?.response);
      }
    }
  }
);
