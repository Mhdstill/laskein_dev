import { createSlice } from '@reduxjs/toolkit';
import BoxParamsDTO from 'data/dto/BoxParams.dto';
import { BoxParamsInitialState } from './boxParams.interface';
import { createBoxParams } from './useCase/create';
import { deleteBoxParams } from './useCase/delete';
import { editBoxParams } from './useCase/edit';
import { getBoxParams } from './useCase/get';
import { getBoxParamsList } from './useCase/getList';
import { updateBoxParams } from './useCase/update';

const initialState: BoxParamsInitialState = {
  boxParamsList: [],
  boxParams: {} as BoxParamsDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadBoxParams: '',
};

export const boxParamsSlice = createSlice({
  name: 'boxParams',
  initialState,
  reducers: {
    cancelEditBoxParams: (state) => {
      state.isEditing = false;
      state.boxParams = {} as BoxParamsDTO;
    },
    reloadBoxParamsList: (state, action) => {
      state.reloadBoxParams = action.payload;
    },
  },
  extraReducers: {
    [getBoxParams.pending.type]: (state) => {
      state.loading = true;
    },
    [getBoxParams.fulfilled.type]: (state, action) => {
      state.boxParams = action.payload;
      state.loading = false;
    },
    [getBoxParams.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getBoxParamsList.pending.type]: (state) => {
      state.loading = true;
    },
    [getBoxParamsList.fulfilled.type]: (state, action) => {
      state.boxParamsList = action.payload;
      state.loading = false;
    },
    [getBoxParamsList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createBoxParams.pending.type]: (state) => {
      state.loading = true;
    },
    [createBoxParams.fulfilled.type]: (state) => {
      state.loading = false;
      state.boxParams = {} as BoxParamsDTO;
    },
    [createBoxParams.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateBoxParams.pending.type]: (state) => {
      state.loading = true;
    },
    [updateBoxParams.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.boxParams = {} as BoxParamsDTO;
    },
    [updateBoxParams.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteBoxParams.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteBoxParams.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteBoxParams.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editBoxParams.pending.type]: (state) => {
      state.loading = true;
    },
    [editBoxParams.fulfilled.type]: (state, action) => {
      state.boxParams = action.payload;
      state.isEditing = true;
      state.loading = false;
    },
    [editBoxParams.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditBoxParams, reloadBoxParamsList } =
  boxParamsSlice.actions;
