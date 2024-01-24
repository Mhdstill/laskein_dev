import { createAsyncThunk } from '@reduxjs/toolkit';
import OrderDTO from 'data/dto/Order.dto';
import { enqueueSnackbar } from 'services/redux/notification/notificationSlice';
import axiosInstance from 'utils/axios';

export const createOrder = createAsyncThunk(
  'order/create',
  async (data: OrderDTO, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/order', data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: 'Commande créée avec succès',
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
            message: "Erreur lors de la création d'une commande",
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
