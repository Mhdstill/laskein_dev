import { createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import axiosInstance from 'utils/axios';

export const deleteArticlePhoto = createAsyncThunk(
  'articlePhoto/delete',
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/article-photo/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Article Image supprimé avec succès',
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
