import { createAsyncThunk } from '@reduxjs/toolkit';
import SubCategoryDTO from '../../../../../data/dto/SubCategory.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const createSubCategory = createAsyncThunk(
  'subCategory/create',
  async (data: SubCategoryDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/sub-category', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Sous catégorie d'article créé avec succès",
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
            message: 'Erreur lors de la création de la sous catégorie ',
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
