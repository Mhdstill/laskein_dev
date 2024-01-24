import { createAsyncThunk } from '@reduxjs/toolkit';
import UnitySizeDTO from 'data/dto/UnitySize.dto';
import axiosInstance from '../../../../utils/axios';
import { enqueueSnackbar } from '../../notification/notificationSlice';

export const createUnitySize = createAsyncThunk(
  'unitySize/create',
  async (data: UnitySizeDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/unity-size', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Taille unitaire créée avec succès',
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
            message: 'Erreur lors de la création du taille unitaire',
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
