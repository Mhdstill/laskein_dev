import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import OrderDTO from 'data/dto/Order.dto';
import { OrderInitialState } from './order.interface';
import { createOrder } from './useCase/create';
import { deleteOrder } from './useCase/delete';
import { editOrder } from './useCase/edit';
import { getOrder } from './useCase/get';
import { getOrderList } from './useCase/getList';
import { updateOrder } from './useCase/update';

const initialState: OrderInitialState = {
  orderList: [],
  order: {} as OrderDTO,
  isEditing: false,
  loading: false,
  activeUi: 'list',
  error: null,
  reloadOrder: '',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    cancelEditOrder: (state) => {
      state.isEditing = false;
      state.order = {} as OrderDTO;
    },
    setActiveUi: (
      state,
      action: PayloadAction<'list' | 'form' | 'details'>
    ) => {
      state.activeUi = action.payload;
    },
    reloadOrderList: (state, action) => {
      state.reloadOrder = action.payload;
    },
  },
  extraReducers: {
    [getOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [getOrder.fulfilled.type]: (state, action) => {
      state.order = action.payload;
      state.loading = false;
    },
    [getOrder.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getOrderList.pending.type]: (state) => {
      state.loading = true;
    },
    [getOrderList.fulfilled.type]: (state, action) => {
      state.orderList = action.payload;
      state.loading = false;
    },
    [getOrderList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [createOrder.fulfilled.type]: (state) => {
      state.loading = false;
      state.order = {} as OrderDTO;
    },
    [createOrder.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [editOrder.fulfilled.type]: (state, action) => {
      state.order = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editOrder.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [updateOrder.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.order = {} as OrderDTO;
    },
    [updateOrder.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteOrder.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteOrder.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditOrder, setActiveUi, reloadOrderList } =
  orderSlice.actions;
