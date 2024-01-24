import { createAsyncThunk } from '@reduxjs/toolkit';
import PriceDTO from '../../../../../data/dto/Price.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const updatePrice = createAsyncThunk(
  'price/update',
  async (data: { id: string; price: PriceDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/price/${data.id}`,
        data.price
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Prix mis à jour avec succès',
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
