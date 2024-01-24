import { createSlice } from '@reduxjs/toolkit';
import BoxArticleDTO from 'data/dto/BoxArticle.dto';
import { BoxArticleInitialState } from './boxArticle.interface';
import { createBoxArticle } from './useCase/create';
import { deleteBoxArticle } from './useCase/delete';
import { editBoxArticle } from './useCase/edit';
import { getBoxArticle } from './useCase/get';
import { getBoxArticleList } from './useCase/getList';
import { updateBoxArticle } from './useCase/update';

const initialState: BoxArticleInitialState = {
  boxArticleList: [],
  boxArticle: {} as BoxArticleDTO,
  isEditing: false,
  loading: false,
  error: null,
};

export const boxArticleSlice = createSlice({
  name: 'boxArticle',
  initialState,
  reducers: {
    cancelEditBoxArticle: (state) => {
      state.isEditing = false;
      state.boxArticle = {} as BoxArticleDTO;
    },
  },
  extraReducers: {
    [getBoxArticle.pending.type]: (state) => {
      state.loading = true;
    },
    [getBoxArticle.fulfilled.type]: (state, action) => {
      state.boxArticle = action.payload;
      state.loading = false;
    },
    [getBoxArticle.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getBoxArticleList.pending.type]: (state) => {
      state.loading = true;
    },
    [getBoxArticleList.fulfilled.type]: (state, action) => {
      state.boxArticleList = action.payload;
      state.loading = false;
    },
    [getBoxArticleList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createBoxArticle.pending.type]: (state) => {
      state.loading = true;
    },
    [createBoxArticle.fulfilled.type]: (state) => {
      state.loading = false;
      state.boxArticle = {} as BoxArticleDTO;
    },
    [createBoxArticle.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateBoxArticle.pending.type]: (state) => {
      state.loading = true;
    },
    [updateBoxArticle.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.boxArticle = {} as BoxArticleDTO;
    },
    [updateBoxArticle.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteBoxArticle.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteBoxArticle.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteBoxArticle.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editBoxArticle.pending.type]: (state) => {
      state.loading = true;
    },
    [editBoxArticle.fulfilled.type]: (state, action) => {
      state.boxArticle = action.payload;
      state.isEditing = true;
      state.loading = false;
    },
    [editBoxArticle.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditBoxArticle } = boxArticleSlice.actions;
