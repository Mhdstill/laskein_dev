import { createAsyncThunk } from '@reduxjs/toolkit';
import ProviderDTO from '../../../../../data/dto/Provider.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const createProvider = createAsyncThunk(
  'provider/create',
  async (data: ProviderDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/provider', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Fournisseur créé avec succès',
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
            message: 'Erreur lors de la création du fournisseur',
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
