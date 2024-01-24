import { createAsyncThunk } from '@reduxjs/toolkit';
import BoxTypeDTO from '../../../../../data/dto/BoxType.dto';
import axiosInstance from '../../../../../utils/axios';
import { enqueueSnackbar } from '../../../notification/notificationSlice';

export const updateBoxType = createAsyncThunk(
  'boxType/update',
  async (data: { id: string; boxType: BoxTypeDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/box-type/${data.id}`,
        data.boxType
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Type de box mis à jour avec succès',
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
