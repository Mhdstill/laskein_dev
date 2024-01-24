import { createAsyncThunk } from '@reduxjs/toolkit';
import BoxImageDTO from 'data/dto/BoxImage.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const createBoxImage = createAsyncThunk(
  'boxImage/create',
  async (data: BoxImageDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/box-image', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Image du box ajouté',
          options: {
            variant: 'success',
          },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Erreur lors de l'ajout de l'image ",
            options: {
              variant: 'error',
            },
          })
        );
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
