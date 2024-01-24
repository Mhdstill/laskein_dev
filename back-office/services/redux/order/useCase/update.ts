import { createAsyncThunk } from '@reduxjs/toolkit';
import OrderDTO from 'data/dto/Order.dto';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import axiosInstance from 'utils/axios';

export const updateOrder = createAsyncThunk(
  'order/update',
  async (data: { id: string; order: OrderDTO }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `/order/${data.id}`,
        data.order
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Commande mise à jour avec succès',
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
