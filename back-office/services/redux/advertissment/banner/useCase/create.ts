import { createAsyncThunk } from '@reduxjs/toolkit';
import BannerImageDTO from 'data/dto/BannerImage.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const createBannerImage = createAsyncThunk(
  'bannerImage/create',
  async (data: BannerImageDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/banner-image', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Image ajouté',
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
            message: "Erreur lors de l'ajout de l'image ",
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
