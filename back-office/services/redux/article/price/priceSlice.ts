import { createSlice } from '@reduxjs/toolkit';
import PriceDTO from '../../../../data/dto/Price.dto';
import { PriceInitialState } from './price.interface';
import { createPrice } from './useCase/create';
import { deletePrice } from './useCase/delete';
import { editPrice } from './useCase/edit';
import { getPrice } from './useCase/get';
import { getPriceList } from './useCase/getList';
import { updatePrice } from './useCase/update';

const initialState: PriceInitialState = {
  priceList: [],
  price: {} as PriceDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadPrice: '',
};

export const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    cancelEditPrice: (state) => {
      state.isEditing = false;
      state.price = {} as PriceDTO;
    },
    reloadPriceList: (state, action) => {
      state.reloadPrice = action.payload;
    },
  },
  extraReducers: {
    [getPrice.pending.type]: (state) => {
      state.loading = true;
    },
    [getPrice.fulfilled.type]: (state, action) => {
      state.price = action.payload;
      state.loading = false;
    },
    [getPrice.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getPriceList.pending.type]: (state) => {
      state.loading = true;
    },
    [getPriceList.fulfilled.type]: (state, action) => {
      state.priceList = action.payload;
      state.loading = false;
    },
    [getPriceList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createPrice.pending.type]: (state) => {
      state.loading = true;
    },
    [createPrice.fulfilled.type]: (state) => {
      state.loading = false;
      state.price = {} as PriceDTO;
    },
    [createPrice.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updatePrice.pending.type]: (state) => {
      state.loading = true;
    },
    [updatePrice.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.price = {} as PriceDTO;
    },
    [updatePrice.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deletePrice.pending.type]: (state) => {
      state.loading = true;
    },
    [deletePrice.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deletePrice.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editPrice.pending.type]: (state) => {
      state.loading = true;
    },
    [editPrice.fulfilled.type]: (state, action) => {
      state.price = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editPrice.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditPrice, reloadPriceList } = priceSlice.actions;
