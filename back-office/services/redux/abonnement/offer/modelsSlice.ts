import { createSlice } from '@reduxjs/toolkit';
import OfferDTO from 'data/dto/Offer.dto';
import { OfferInitialState } from './models.interface';
import { createOffer } from './useCase/create';
import { deleteOffer } from './useCase/delete';
import { editOffer } from './useCase/edit';
import { getOffer } from './useCase/get';
import { getOfferList } from './useCase/getList';
import { updateOffer } from './useCase/update';

const initialState: OfferInitialState = {
  offerList: [],
  offer: {} as OfferDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadOffer: '',
};

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    cancelEditOffer: (state) => {
      state.isEditing = false;
      state.offer = {} as OfferDTO;
    },
    reloadOfferList: (state, action) => {
      state.reloadOffer = action.payload;
    },
  },
  extraReducers: {
    [getOffer.pending.type]: (state) => {
      state.loading = true;
    },
    [getOffer.fulfilled.type]: (state, action) => {
      state.offer = action.payload;
      state.loading = false;
    },
    [getOffer.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getOfferList.pending.type]: (state) => {
      state.loading = true;
    },
    [getOfferList.fulfilled.type]: (state, action) => {
      state.offerList = action.payload;
      state.loading = false;
    },
    [getOfferList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createOffer.pending.type]: (state) => {
      state.loading = true;
    },
    [createOffer.fulfilled.type]: (state) => {
      state.loading = false;
      state.offer = {} as OfferDTO;
    },
    [createOffer.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateOffer.pending.type]: (state) => {
      state.loading = true;
    },
    [updateOffer.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.offer = {} as OfferDTO;
    },
    [updateOffer.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteOffer.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteOffer.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteOffer.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editOffer.pending.type]: (state) => {
      state.loading = true;
    },
    [editOffer.fulfilled.type]: (state, action) => {
      state.offer = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editOffer.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditOffer, reloadOfferList } = offerSlice.actions;
