import { createAsyncThunk } from '@reduxjs/toolkit';
import UserDTO from 'data/dto/User.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const updateMember = createAsyncThunk(
  'member/update',
  async (data: { id: string; user: UserDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/user/${data.id}`, data.user);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Member mis à jour avec succès',
          options: {
            variant: 'success',
          },
        })
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
