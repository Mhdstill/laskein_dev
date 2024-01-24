import { createAsyncThunk } from '@reduxjs/toolkit';
import BoxArticleDTO from 'data/dto/BoxArticle.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const createBoxArticle = createAsyncThunk(
  'boxArticle/create',
  async (data: BoxArticleDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/box-article', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Article ajouté dans le box avec succès',
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
            message: 'Arreur, article non ajouté dans le box',
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
