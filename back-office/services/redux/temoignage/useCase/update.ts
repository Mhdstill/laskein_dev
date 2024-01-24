import { createAsyncThunk } from '@reduxjs/toolkit';
import TestimonialDTO from 'data/dto/Tesimonial.dto';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import axiosInstance from 'utils/axios';

export const updateTemoignage = createAsyncThunk(
  'temoignage/update',
  async (data: { id: string; temoignage: TestimonialDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/temoignage/${data.id}`,
        data.temoignage
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Temoignage mis à jour avec succès',
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
