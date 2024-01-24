import { createAsyncThunk } from '@reduxjs/toolkit';
import BoxParamsDTO from 'data/dto/BoxParams.dto';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import axiosInstance from 'utils/axios';

export const createBoxParams = createAsyncThunk(
  'BoxParams/create',
  async (data: BoxParamsDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/box-params', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message:
            'Vous avez ajouté ce box parmi la liste des box le plus vendu',
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
            message:
              "Erreur lors de l'ajout du box sur la liste de box le plus vendu",
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
