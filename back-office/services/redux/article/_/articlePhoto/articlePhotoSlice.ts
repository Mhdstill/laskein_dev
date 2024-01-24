import { createSlice } from '@reduxjs/toolkit';
import ArticlePhotoDTO from 'data/dto/articlePhoto.dto';
import { ArticlePhotoInitialState } from './articlePhoto.interface';
import { createArticlePhoto } from './useCase/create';
import { deleteArticlePhoto } from './useCase/delete';
import { editArticlePhoto } from './useCase/edit';
import { getArticlePhoto } from './useCase/get';
import { getArticlePhotoList } from './useCase/getList';
import { updateArticlePhoto } from './useCase/update';

const initialState: ArticlePhotoInitialState = {
  articlePhotoList: [],
  articlePhoto: {} as ArticlePhotoDTO,
  isEditing: false,
  loading: false,
  error: null,
};

export const articlePhotoSlice = createSlice({
  name: 'articlePhoto',
  initialState,
  reducers: {
    cancelEditArticlePhoto: (state) => {
      state.isEditing = false;
      state.articlePhoto = {} as ArticlePhotoDTO;
    },
  },
  extraReducers: {
    [getArticlePhoto.pending.type]: (state) => {
      state.loading = true;
    },
    [getArticlePhoto.fulfilled.type]: (state, action) => {
      state.articlePhoto = action.payload;
      state.loading = false;
    },
    [getArticlePhoto.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getArticlePhotoList.pending.type]: (state) => {
      state.loading = true;
    },
    [getArticlePhotoList.fulfilled.type]: (state, action) => {
      state.articlePhotoList = action.payload;
      state.loading = false;
    },
    [getArticlePhotoList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createArticlePhoto.pending.type]: (state) => {
      state.loading = true;
    },
    [createArticlePhoto.fulfilled.type]: (state) => {
      state.loading = false;
      state.articlePhoto = {} as ArticlePhotoDTO;
    },
    [createArticlePhoto.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateArticlePhoto.pending.type]: (state) => {
      state.loading = true;
    },
    [updateArticlePhoto.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.articlePhoto = {} as ArticlePhotoDTO;
    },
    [updateArticlePhoto.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteArticlePhoto.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteArticlePhoto.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteArticlePhoto.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editArticlePhoto.pending.type]: (state) => {
      state.loading = true;
    },
    [editArticlePhoto.fulfilled.type]: (state, action) => {
      state.articlePhoto = action.payload;
      state.isEditing = true;
      state.loading = false;
    },
    [editArticlePhoto.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditArticlePhoto } = articlePhotoSlice.actions;
