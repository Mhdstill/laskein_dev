import { createAsyncThunk } from '@reduxjs/toolkit';
import OfferDTO from 'data/dto/Offer.dto';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import axiosInstance from 'utils/axios';

export const updateOffer = createAsyncThunk(
  'offer/update',
  async (data: { id: string; offer: OfferDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/offer/${data.id}`,
        data.offer
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Offer mis à jour avec succès',
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
