import { createAsyncThunk } from '@reduxjs/toolkit';
import PostDTO from 'data/dto/Post.dto';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import axiosInstance from 'utils/axios';

export const updatePost = createAsyncThunk(
  'post/update',
  async (data: { id: string; post: PostDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/post/${data.id}`, data.post);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Poste mise à jour avec succès',
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
