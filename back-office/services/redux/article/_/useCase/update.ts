import { createAsyncThunk } from '@reduxjs/toolkit';
import ArticleDTO from '../../../../../data/dto/Article.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const updateArticle = createAsyncThunk(
  'article/update',
  async (data: { id: string; article: ArticleDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/article/${data.id}`,
        data.article
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Article mis à jour avec succès',
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
            message: "Erreur lors de la mis à jour de l'article",
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
