import { createAsyncThunk } from '@reduxjs/toolkit';
import PermissionDTO from '../../../../data/dto/Permission.dto';
import axiosInstance from '../../../../utils/axios';
import { enqueueSnackbar } from '../../notification/notificationSlice';

export const createPermission = createAsyncThunk(
  'permission/create',
  async (data: PermissionDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/permission', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Permission créée avec succès',
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
            message: 'Erreur lors de la création du Permission',
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
