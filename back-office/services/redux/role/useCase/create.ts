import { createAsyncThunk } from '@reduxjs/toolkit';
import RuleDTO from '../../../../data/dto/Rule.dto';
import axiosInstance from '../../../../utils/axios';
import { enqueueSnackbar } from '../../notification/notificationSlice';

export const createRole = createAsyncThunk(
  'role/create',
  async (data: RuleDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/role', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Role créée avec succès',
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
            message: 'Erreur lors de la création du Role',
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
