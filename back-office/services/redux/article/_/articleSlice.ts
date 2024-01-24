import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import ArticleDTO from '../../../../data/dto/Article.dto';
import { ArticleInitialState } from './article.interface';
import { createArticle } from './useCase/create';
import { deleteArticle } from './useCase/delete';
import { editArticle } from './useCase/edit';
import { getArticle } from './useCase/get';
import { getArticleList } from './useCase/getList';
import { updateArticle } from './useCase/update';

const initialState: ArticleInitialState = {
  articleList: [],
  articleInBox: [],
  article: {} as ArticleDTO,
  isEditing: false,
  loading: false,
  activeUi: 'list',
  error: null,
  reloadArticle: '',
};

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    cancelEditArticle: (state) => {
      state.isEditing = false;
      state.article = {} as ArticleDTO;
    },
    setActiveUi: (
      state,
      action: PayloadAction<'list' | 'form' | 'details'>
    ) => {
      state.activeUi = action.payload;
    },
    reloadArticleList: (state, action) => {
      state.reloadArticle = action.payload;
    },
  },
  extraReducers: {
    [getArticle.pending.type]: (state) => {
      state.loading = true;
    },
    [getArticle.fulfilled.type]: (state, action) => {
      state.article = action.payload;
      state.loading = false;
    },
    [getArticle.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getArticleList.pending.type]: (state) => {
      state.loading = true;
    },
    [getArticleList.fulfilled.type]: (state, action) => {
      state.articleList = action.payload;
      state.loading = false;
    },
    [getArticleList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createArticle.pending.type]: (state) => {
      state.loading = true;
    },
    [createArticle.fulfilled.type]: (state) => {
      state.loading = false;
      state.article = {} as ArticleDTO;
    },
    [createArticle.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateArticle.pending.type]: (state) => {
      state.loading = true;
    },
    [updateArticle.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.article = {} as ArticleDTO;
    },
    [updateArticle.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteArticle.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteArticle.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteArticle.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editArticle.pending.type]: (state) => {
      state.loading = true;
    },
    [editArticle.fulfilled.type]: (state, action) => {
      state.article = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editArticle.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditArticle, setActiveUi, reloadArticleList } =
  articleSlice.actions;
