import { createAsyncThunk } from '@reduxjs/toolkit';
import BoxImageDTO from 'data/dto/BoxImage.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const updateBoxImage = createAsyncThunk(
  'boxImage/update',
  async (data: { id: string; boxImage: BoxImageDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/box-image/${data.id}`,
        data.boxImage
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Box Image mis à jour avec succès',
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
