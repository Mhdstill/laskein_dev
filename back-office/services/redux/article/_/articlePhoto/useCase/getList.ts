import { createAsyncThunk } from '@reduxjs/toolkit';
import { ArticlePhotoQuery } from 'data/Query/articlePhoto.query';
import axiosInstance from 'utils/axios';

export const getArticlePhotoList = createAsyncThunk(
  'articlePhoto/getList',
  async (data: { args?: ArticlePhotoQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get('/article-photo', { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
