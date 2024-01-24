import { createAsyncThunk } from '@reduxjs/toolkit';
import { ArticleQuery } from 'data/Query/article.query';
import axiosInstance from '../../../../../utils/axios';

export const getArticleList = createAsyncThunk(
  'article/getList',
  async (data: { args?: ArticleQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get('/article', { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
