import { createSlice } from '@reduxjs/toolkit';
import ModelDTO from '../../../data/dto/Model.dto';
import { ModelsInitialState } from './models.interface';
import { createModels } from './useCase/create';
import { deleteModels } from './useCase/delete';
import { editModels } from './useCase/edit';
import { getModels } from './useCase/get';
import { getModelsList } from './useCase/getList';
import { updateModels } from './useCase/update';

const initialState: ModelsInitialState = {
  modelsList: [],
  models: {} as ModelDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadModel: '',
};

export const modelsSlice = createSlice({
  name: 'models',
  initialState,
  reducers: {
    cancelEditModels: (state) => {
      state.isEditing = false;
      state.models = {} as ModelDTO;
    },
    reloadModelList: (state, action) => {
      state.reloadModel = action.payload;
    },
  },
  extraReducers: {
    [getModels.pending.type]: (state) => {
      state.loading = true;
    },
    [getModels.fulfilled.type]: (state, action) => {
      state.models = action.payload;
      state.loading = false;
    },
    [getModels.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getModelsList.pending.type]: (state) => {
      state.loading = true;
    },
    [getModelsList.fulfilled.type]: (state, action) => {
      state.modelsList = action.payload;
      state.loading = false;
    },
    [getModelsList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createModels.pending.type]: (state) => {
      state.loading = true;
    },
    [createModels.fulfilled.type]: (state) => {
      state.loading = false;
      state.models = {} as ModelDTO;
    },
    [createModels.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateModels.pending.type]: (state) => {
      state.loading = true;
    },
    [updateModels.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.models = {} as ModelDTO;
    },
    [updateModels.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteModels.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteModels.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteModels.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editModels.pending.type]: (state) => {
      state.loading = true;
    },
    [editModels.fulfilled.type]: (state, action) => {
      state.models = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editModels.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditModels, reloadModelList } = modelsSlice.actions;
