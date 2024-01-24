import { createAsyncThunk } from '@reduxjs/toolkit';
import PostDTO from 'data/dto/Post.dto';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import axiosInstance from 'utils/axios';

export const createPost = createAsyncThunk(
  'post/create',
  async (data: PostDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/post', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Post créée avec succès',
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
            message: "Erreur lors de la création d'une Poste",
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
