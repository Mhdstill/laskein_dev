import { createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import axiosInstance from 'utils/axios';

export const deleteBoxParams = createAsyncThunk(
  'boxParams/delete',
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/box-params/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Vous avez supprimé l'un des Box les plus vendus",
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
