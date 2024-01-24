import { createAsyncThunk } from '@reduxjs/toolkit';
import BoxArticleDTO from 'data/dto/BoxArticle.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const updateBoxArticle = createAsyncThunk(
  'boxArticle/update',
  async (data: { id: string; boxArticle: BoxArticleDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/box-article/${data.id}`,
        data.boxArticle
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Box article mis à jour avec succès',
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
