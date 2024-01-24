import { createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import axiosInstance from 'utils/axios';

export const deleteTemoignage = createAsyncThunk(
  'temoignage/delete',
  async (data: { id: number }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/temoignage/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Temoignage supprimé avec succès',
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
