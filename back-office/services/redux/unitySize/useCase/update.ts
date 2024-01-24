import { createAsyncThunk } from '@reduxjs/toolkit';
import UnitySizeDTO from 'data/dto/UnitySize.dto';
import axiosInstance from '../../../../utils/axios';
import { enqueueSnackbar } from '../../notification/notificationSlice';

export const updateUnitySize = createAsyncThunk(
  'unitySize/update',
  async (data: { id: string; unitySize: UnitySizeDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/unity-size/${data.id}`,
        data.unitySize
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Taille unitaire mis à jour avec succès',
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
