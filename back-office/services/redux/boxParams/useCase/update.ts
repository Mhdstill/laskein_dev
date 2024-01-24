import { createAsyncThunk } from '@reduxjs/toolkit';
import BoxParamsDTO from 'data/dto/BoxParams.dto';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import axiosInstance from 'utils/axios';

export const updateBoxParams = createAsyncThunk(
  'boxParams/update',
  async (data: { id: string; boxParams: BoxParamsDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/box-params/${data.id}`,
        data.boxParams
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Box  mis à jour avec succès',
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
