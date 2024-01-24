import { createSlice } from '@reduxjs/toolkit';
import BoxImageDTO from 'data/dto/BoxImage.dto';
import { BoxImageInitialState } from './boxImag.interface';
import { createBoxImage } from './useCase/create';
import { deleteBoxImage } from './useCase/delete';
import { editBoxImage } from './useCase/edit';
import { getBoxImage } from './useCase/get';
import { getBoxImageList } from './useCase/getList';
import { updateBoxImage } from './useCase/update';

const initialState: BoxImageInitialState = {
  boxImageList: [],
  boxImage: {} as BoxImageDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadBoxImage: '',
};

export const boxImageSlice = createSlice({
  name: 'boxImage',
  initialState,
  reducers: {
    cancelEditBoxImage: (state) => {
      state.isEditing = false;
      state.boxImage = {} as BoxImageDTO;
    },
    reloadBoxImageList: (state, action) => {
      state.reloadBoxImage = action.payload;
    },
  },
  extraReducers: {
    [getBoxImage.pending.type]: (state) => {
      state.loading = true;
    },
    [getBoxImage.fulfilled.type]: (state, action) => {
      state.boxImage = action.payload;
      state.loading = false;
    },
    [getBoxImage.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getBoxImageList.pending.type]: (state) => {
      state.loading = true;
    },
    [getBoxImageList.fulfilled.type]: (state, action) => {
      state.boxImageList = action.payload;
      state.loading = false;
    },
    [getBoxImageList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createBoxImage.pending.type]: (state) => {
      state.loading = true;
    },
    [createBoxImage.fulfilled.type]: (state) => {
      state.loading = false;
      state.boxImage = {} as BoxImageDTO;
    },
    [createBoxImage.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateBoxImage.pending.type]: (state) => {
      state.loading = true;
    },
    [updateBoxImage.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.boxImage = {} as BoxImageDTO;
    },
    [updateBoxImage.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteBoxImage.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteBoxImage.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteBoxImage.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editBoxImage.pending.type]: (state) => {
      state.loading = true;
    },
    [editBoxImage.fulfilled.type]: (state, action) => {
      state.boxImage = action.payload;
      state.isEditing = true;
      state.loading = false;
    },
    [editBoxImage.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditBoxImage, reloadBoxImageList } = boxImageSlice.actions;
