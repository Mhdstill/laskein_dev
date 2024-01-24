import { createAsyncThunk } from '@reduxjs/toolkit';
import ArticleDTO from '../../../../../data/dto/Article.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const createArticle = createAsyncThunk(
  'article/create',
  async (data: ArticleDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/article', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Article créé avec succès',
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
            message: "Erreur lors de la création de l'article",
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
