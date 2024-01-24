import { createAsyncThunk } from '@reduxjs/toolkit';
import TestimonialDTO from 'data/dto/Tesimonial.dto';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import axiosInstance from 'utils/axios';

export const createTemoignage = createAsyncThunk(
  'temoignage/create',
  async (data: TestimonialDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/temoignage', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Temoignage créé avec succès',
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
            message: 'Erreur lors de la création du Temoignage ',
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
