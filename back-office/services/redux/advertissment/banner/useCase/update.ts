import { createAsyncThunk } from '@reduxjs/toolkit';
import BannerImageDTO from 'data/dto/BannerImage.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const updateBannerImage = createAsyncThunk(
  'bannerImage/update',
  async (data: { id: string; bannerImage: BannerImageDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/banner-image/${data.id}`,
        data.bannerImage
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Banner Image mis à jour avec succès',
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
