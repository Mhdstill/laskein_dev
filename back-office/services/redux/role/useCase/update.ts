import { createAsyncThunk } from '@reduxjs/toolkit';
import RuleDTO from '../../../../data/dto/Rule.dto';
import axiosInstance from '../../../../utils/axios';
import { enqueueSnackbar } from '../../notification/notificationSlice';

export const updateRole = createAsyncThunk(
  'role/update',
  async (data: { id: string; role: RuleDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/role/${data.id}`, data.role);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Model mise à jour avec succès',
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
