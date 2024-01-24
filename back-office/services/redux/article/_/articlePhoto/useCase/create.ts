import { createAsyncThunk } from '@reduxjs/toolkit';
import ArticlePhotoDTO from 'data/dto/articlePhoto.dto';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import axiosInstance from 'utils/axios';

export const createArticlePhoto = createAsyncThunk(
  'articlePhoto/create',
  async (data: ArticlePhotoDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/article-photo', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Image de l'article ajoutée",
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
            message: "Erreur lors de l'ajout de l'image ",
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
