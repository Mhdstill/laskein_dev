import { createSlice } from '@reduxjs/toolkit';
import TestimonialDTO from 'data/dto/Tesimonial.dto';
import { TemoignageInitialState } from './sub.category.interface';
import { createTemoignage } from './useCase/create';
import { deleteTemoignage } from './useCase/delete';
import { editTemoignage } from './useCase/edit';
import { getTemoignage } from './useCase/get';
import { getTemoignageList } from './useCase/getList';
import { updateTemoignage } from './useCase/update';

const initialState: TemoignageInitialState = {
  temoignageList: [],
  temoignage: {} as TestimonialDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadTemoignage: '',
};

export const temoignageSlice = createSlice({
  name: 'temoignage',
  initialState,
  reducers: {
    cancelEditTemoignage: (state) => {
      state.isEditing = false;
      state.temoignage = {} as TestimonialDTO;
    },
    reloadTemoignageList: (state, action) => {
      state.reloadTemoignage = action.payload;
    },
  },
  extraReducers: {
    [getTemoignage.pending.type]: (state) => {
      state.loading = true;
    },
    [getTemoignage.fulfilled.type]: (state, action) => {
      state.temoignage = action.payload;
      state.loading = false;
    },
    [getTemoignage.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getTemoignageList.pending.type]: (state) => {
      state.loading = true;
    },
    [getTemoignageList.fulfilled.type]: (state, action) => {
      state.temoignageList = action.payload;
      state.loading = false;
    },
    [getTemoignageList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createTemoignage.pending.type]: (state) => {
      state.loading = true;
    },
    [createTemoignage.fulfilled.type]: (state) => {
      state.loading = false;
      state.temoignage = {} as TestimonialDTO;
    },
    [createTemoignage.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateTemoignage.pending.type]: (state) => {
      state.loading = true;
    },
    [updateTemoignage.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.temoignage = {} as TestimonialDTO;
    },
    [updateTemoignage.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteTemoignage.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteTemoignage.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteTemoignage.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editTemoignage.pending.type]: (state) => {
      state.loading = true;
    },
    [editTemoignage.fulfilled.type]: (state, action) => {
      state.temoignage = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editTemoignage.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditTemoignage, reloadTemoignageList } =
  temoignageSlice.actions;
