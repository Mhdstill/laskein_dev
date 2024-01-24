import { createAsyncThunk } from '@reduxjs/toolkit';
import SubCategoryDTO from '../../../../../data/dto/SubCategory.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const updateSubCategory = createAsyncThunk(
  'subCategory/update',
  async (data: { id: string; subCategory: SubCategoryDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/sub-category/${data.id}`,
        data.subCategory
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Sous categorie d'article mis à jour avec succès",
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
