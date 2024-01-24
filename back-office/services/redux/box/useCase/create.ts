import { createAsyncThunk } from '@reduxjs/toolkit';
import BoxDTO from 'data/dto/Box.dto';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import axiosInstance from 'utils/axios';

export const createBox = createAsyncThunk(
  'box/create',
  async (data: BoxDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/box', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Box créé avec succès',
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
            message: 'Erreur lors de la création de Box  ',
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
