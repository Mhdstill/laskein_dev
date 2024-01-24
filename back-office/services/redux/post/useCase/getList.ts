import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostQuery } from 'data/Query/post.query';
import axiosInstance from 'utils/axios';

export const getPostList = createAsyncThunk(
  'post/getList',
  async (data: { args?: PostQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get('/post', { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
