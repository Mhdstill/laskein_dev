import { createAsyncThunk } from '@reduxjs/toolkit';
import UserDTO from 'data/dto/User.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const createMember = createAsyncThunk(
  'member/create',
  async (data: UserDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/user', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Membre créé avec succès',
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
            message: 'Erreur lors de la création de Membre ',
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
