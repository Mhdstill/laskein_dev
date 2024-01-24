import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const deleteBoxImage = createAsyncThunk(
  'boxImage/delete',
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/box-image/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Box Image supprimé avec succès',
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
