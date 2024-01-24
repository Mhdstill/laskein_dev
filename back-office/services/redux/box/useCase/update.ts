import { createAsyncThunk } from '@reduxjs/toolkit';
import BoxDTO from 'data/dto/Box.dto';
import axiosInstance from '../../../../utils/axios';
import { enqueueSnackbar } from '../../notification/notificationSlice';

export const updateBox = createAsyncThunk(
  'box/update',
  async (data: { id: string; box: BoxDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/box/${data.id}`, data.box);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Box mis à jour avec succès',
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
