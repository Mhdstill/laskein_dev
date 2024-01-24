import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios';
import { enqueueSnackbar } from '../../notification/notificationSlice';

export const deletePermission = createAsyncThunk(
  'permission/delete',
  async (data: { id: number }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/permission/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Permission supprimée avec succès',
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
