import { createAsyncThunk } from '@reduxjs/toolkit';
import PermissionDTO from '../../../../data/dto/Permission.dto';
import axiosInstance from '../../../../utils/axios';
import { enqueueSnackbar } from '../../notification/notificationSlice';

export const updatePermission = createAsyncThunk(
  'permission/update',
  async (data: { id: string; permission: PermissionDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/permission/${data.id}`,
        data.permission
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Permission mis à jour avec succès',
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
