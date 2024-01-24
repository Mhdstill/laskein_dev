import { createSlice } from '@reduxjs/toolkit';
import BoxTypeDTO from '../../../../data/dto/BoxType.dto';
import { BoxTypeInitialState } from './box.type.interface';
import { createBoxType } from './useCase/create';
import { deleteBoxType } from './useCase/delete';
import { editBoxType } from './useCase/edit';
import { getBoxType } from './useCase/get';
import { getBoxTypeList } from './useCase/getList';
import { updateBoxType } from './useCase/update';

const initialState: BoxTypeInitialState = {
  boxTypeList: [],
  boxType: {} as BoxTypeDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadBoxType: '',
};

export const boxTypeSlice = createSlice({
  name: 'boxType',
  initialState,
  reducers: {
    cancelEditBoxType: (state) => {
      state.isEditing = false;
      state.boxType = {} as BoxTypeDTO;
    },
    reloadBoxTypeList: (state, action) => {
      state.reloadBoxType = action.payload;
    },
  },
  extraReducers: {
    [getBoxType.pending.type]: (state) => {
      state.loading = true;
    },
    [getBoxType.fulfilled.type]: (state, action) => {
      state.boxType = action.payload;
      state.loading = false;
    },
    [getBoxType.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getBoxTypeList.pending.type]: (state) => {
      state.loading = true;
    },
    [getBoxTypeList.fulfilled.type]: (state, action) => {
      state.boxTypeList = action.payload;
      state.loading = false;
    },
    [getBoxTypeList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createBoxType.pending.type]: (state) => {
      state.loading = true;
    },
    [createBoxType.fulfilled.type]: (state) => {
      state.loading = false;
      state.boxType = {} as BoxTypeDTO;
    },
    [createBoxType.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateBoxType.pending.type]: (state) => {
      state.loading = true;
    },
    [updateBoxType.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.boxType = {} as BoxTypeDTO;
    },
    [updateBoxType.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteBoxType.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteBoxType.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteBoxType.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editBoxType.pending.type]: (state) => {
      state.loading = true;
    },
    [editBoxType.fulfilled.type]: (state, action) => {
      state.boxType = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editBoxType.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditBoxType, reloadBoxTypeList } = boxTypeSlice.actions;
