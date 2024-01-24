import { createAsyncThunk } from '@reduxjs/toolkit';
import OfferDTO from 'data/dto/Offer.dto';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import axiosInstance from 'utils/axios';

export const createOffer = createAsyncThunk(
  'offer/create',
  async (data: OfferDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/offer', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Offre créée avec succès',
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
            message: 'Erreur lors de la création une Offre',
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
