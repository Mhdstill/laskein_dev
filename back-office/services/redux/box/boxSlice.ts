import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import BoxDTO from 'data/dto/Box.dto';
import { BoxInitialState } from './box.interface';
import { createBox } from './useCase/create';
import { deleteBox } from './useCase/delete';
import { editBox } from './useCase/edit';
import { getBox } from './useCase/get';
import { getBoxList } from './useCase/getList';
import { updateBox } from './useCase/update';

const uiInitialState: BoxInitialState = {
  boxList: [],
  box: {} as BoxDTO,
  isEditing: false,
  loading: false,
  error: null,
  showArticleInBox: false,
  showForm: false,
  boxId: '',
  reloadBox: '',
};

export const boxSlice = createSlice({
  name: 'box',
  initialState: uiInitialState,
  reducers: {
    toggleArticleInsideABox: (state, action: PayloadAction<boolean>) => {
      state.showArticleInBox = action.payload;
    },
    toggleForm: (state, action: PayloadAction<boolean>) => {
      state.showForm = action.payload;
    },
    cancelEditBox: (state) => {
      state.isEditing = false;
      state.box = {} as BoxDTO;
    },
    setBoxId: (state, action: PayloadAction<string>) => {
      state.boxId = action.payload;
    },
    resetBoxId: (state) => {
      state.boxId = '';
    },
    reloadBoxList: (state, action) => {
      state.reloadBox = action.payload;
    },
  },
  extraReducers: {
    [getBox.pending.type]: (state) => {
      state.loading = true;
    },
    [getBox.fulfilled.type]: (state, action) => {
      state.box = action.payload;
      state.loading = false;
    },
    [getBox.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getBoxList.pending.type]: (state) => {
      state.loading = true;
    },
    [getBoxList.fulfilled.type]: (state, action) => {
      state.boxList = action.payload;
      state.loading = false;
    },
    [getBoxList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createBox.pending.type]: (state) => {
      state.loading = true;
    },
    [createBox.fulfilled.type]: (state) => {
      state.loading = false;
      state.box = {} as BoxDTO;
    },
    [createBox.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateBox.pending.type]: (state) => {
      state.loading = true;
    },
    [updateBox.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.box = {} as BoxDTO;
    },
    [updateBox.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteBox.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteBox.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteBox.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editBox.pending.type]: (state) => {
      state.loading = true;
    },
    [editBox.fulfilled.type]: (state, action) => {
      state.box = action.payload;
      state.isEditing = true;
      state.loading = false;
    },
    [editBox.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const {
  toggleArticleInsideABox,
  toggleForm,
  cancelEditBox,
  setBoxId,
  resetBoxId,
  reloadBoxList,
} = boxSlice.actions;
