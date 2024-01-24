import { createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import axiosInstance from 'utils/axios';

export const deleteOrder = createAsyncThunk(
  'order/delete',
  async (data: { id: number }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/order/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Commande supprimée avec succès',
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
