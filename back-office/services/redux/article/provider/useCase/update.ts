import { createAsyncThunk } from '@reduxjs/toolkit';
import ProviderDTO from '../../../../../data/dto/Provider.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const updateProvider = createAsyncThunk(
  'provider/update',
  async (data: { id: string; provider: ProviderDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/provider/${data.id}`,
        data.provider
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Fournisseur mis à jour avec succès',
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
            message: 'Erreur lors de la mise à jour du fournisseur',
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
