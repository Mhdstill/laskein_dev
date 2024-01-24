import { createAsyncThunk } from '@reduxjs/toolkit';
import BoxTypeDTO from '../../../../../data/dto/BoxType.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const createBoxType = createAsyncThunk(
  'boxType/create',
  async (data: BoxTypeDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/box-type', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Type de box créé avec succès',
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
            message: 'Erreur lors de la création du box',
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
