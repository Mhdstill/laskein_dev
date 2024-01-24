import { createAsyncThunk } from '@reduxjs/toolkit';
import { ArticlePhotoQuery } from 'data/Query/articlePhoto.query';
import axiosInstance from 'utils/axios';

export const editArticlePhoto = createAsyncThunk(
  'articlePhoto/edit',
  async (data: { id?: string; args?: ArticlePhotoQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get(`/article-photo/${data.id}`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
