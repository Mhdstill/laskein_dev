import { createAsyncThunk } from '@reduxjs/toolkit';
import ModelDTO from '../../../../data/dto/Model.dto';
import axiosInstance from '../../../../utils/axios';
import { enqueueSnackbar } from '../../notification/notificationSlice';

export const updateModels = createAsyncThunk(
  'models/update',
  async (data: { id: string; models: ModelDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/models/${data.id}`,
        data.models
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Model mis à jour avec succès',
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
