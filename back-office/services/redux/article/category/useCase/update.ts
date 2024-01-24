import { createAsyncThunk } from '@reduxjs/toolkit';
import CategoryDTO from '../../../../../data/dto/Category.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const updateCategory = createAsyncThunk(
  'category/update',
  async (data: { id: string; category: CategoryDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/category/${data.id}`,
        data.category
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Catégorie mis à jour avec succès',
          options: {
            variant: 'success',
          },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
