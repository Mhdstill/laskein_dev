import { createAsyncThunk } from '@reduxjs/toolkit';
import CategoryDTO from '../../../../../data/dto/Category.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const createCategory = createAsyncThunk(
  'category/create',
  async (data: CategoryDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/category', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Catégorie créée avec succès',
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
            message: 'Erreur lors de la création de la catégorie',
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
