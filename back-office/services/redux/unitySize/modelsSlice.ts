import { createSlice } from '@reduxjs/toolkit';
import UnitySizeDTO from '../../../data/dto/UnitySize.dto';
import { UnitySizeInitialState } from './models.interface';
import { createUnitySize } from './useCase/create';
import { deleteUnitySize } from './useCase/delete';
import { editUnitySize } from './useCase/edit';
import { getUnitySize } from './useCase/get';
import { getUnitySizeList } from './useCase/getList';
import { updateUnitySize } from './useCase/update';

const initialState: UnitySizeInitialState = {
  unitySizeList: [],
  unitySize: {} as UnitySizeDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadUnitySize: '',
};

export const unitySizeSlice = createSlice({
  name: 'unitySize',
  initialState,
  reducers: {
    cancelEditUnitySize: (state) => {
      state.isEditing = false;
      state.unitySize = {} as UnitySizeDTO;
    },
    reloadUnitySizeList: (state, action) => {
      state.reloadUnitySize = action.payload;
    },
  },
  extraReducers: {
    [getUnitySize.pending.type]: (state) => {
      state.loading = true;
    },
    [getUnitySize.fulfilled.type]: (state, action) => {
      state.unitySize = action.payload;
      state.loading = false;
    },
    [getUnitySize.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getUnitySizeList.pending.type]: (state) => {
      state.loading = true;
    },
    [getUnitySizeList.fulfilled.type]: (state, action) => {
      state.unitySizeList = action.payload;
      state.loading = false;
    },
    [getUnitySizeList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createUnitySize.pending.type]: (state) => {
      state.loading = true;
    },
    [createUnitySize.fulfilled.type]: (state) => {
      state.loading = false;
      state.unitySize = {} as UnitySizeDTO;
    },
    [createUnitySize.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateUnitySize.pending.type]: (state) => {
      state.loading = true;
    },
    [updateUnitySize.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.unitySize = {} as UnitySizeDTO;
    },
    [updateUnitySize.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteUnitySize.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteUnitySize.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteUnitySize.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editUnitySize.pending.type]: (state) => {
      state.loading = true;
    },
    [editUnitySize.fulfilled.type]: (state, action) => {
      state.unitySize = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editUnitySize.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditUnitySize, reloadUnitySizeList } =
  unitySizeSlice.actions;
