import { createAsyncThunk } from '@reduxjs/toolkit';
import ModelDTO from '../../../../data/dto/Model.dto';
import axiosInstance from '../../../../utils/axios';
import { enqueueSnackbar } from '../../notification/notificationSlice';

export const createModels = createAsyncThunk(
  'models/create',
  async (data: ModelDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/models', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Modèle créée avec succès',
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
            message: 'Erreur lors de la création du modèle',
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
