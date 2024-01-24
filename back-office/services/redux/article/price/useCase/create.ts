import { createAsyncThunk } from '@reduxjs/toolkit';
import PriceDTO from '../../../../../data/dto/Price.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const createPrice = createAsyncThunk(
  'price/create',
  async (data: PriceDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/price', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Prix créé avec succès',
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
            message: 'Erreur lors de la création du prix',
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
