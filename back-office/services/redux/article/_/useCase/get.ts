import { createAsyncThunk } from '@reduxjs/toolkit';
import { ArticleQuery } from 'data/Query/article.query';
import axiosInstance from '../../../../../utils/axios';

export const getArticle = createAsyncThunk(
  'article/get',
  async (data: { id: string; args?: ArticleQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get(`/article/${data.id}`, {
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
