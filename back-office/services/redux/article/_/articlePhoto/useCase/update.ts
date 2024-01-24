import { createAsyncThunk } from '@reduxjs/toolkit';
import ArticlePhotoDTO from 'data/dto/articlePhoto.dto';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import axiosInstance from 'utils/axios';

export const updateArticlePhoto = createAsyncThunk(
  'articlePhoto/update',
  async (data: { id: string; articlePhoto: ArticlePhotoDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/article-photo/${data.id}`,
        data.articlePhoto
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Article Image mis à jour avec succès',
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
