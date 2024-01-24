import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostQuery } from 'data/Query/post.query';
import axiosInstance from 'utils/axios';

export const getPost = createAsyncThunk(
  'post/get',
  async (data: { id: string; args?: PostQuery }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axiosInstance.get(`/post/${data.id}`, {
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
