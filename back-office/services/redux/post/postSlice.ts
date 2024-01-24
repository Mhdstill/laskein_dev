import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import PostDTO from 'data/dto/Post.dto';
import { PostInitialState } from './post.interface';
import { createPost } from './useCase/create';
import { deletePost } from './useCase/delete';
import { editPost } from './useCase/edit';
import { getPost } from './useCase/get';
import { getPostList } from './useCase/getList';
import { updatePost } from './useCase/update';

const initialState: PostInitialState = {
  postList: [],
  post: {} as PostDTO,
  isEditing: false,
  loading: false,
  activeUi: 'list',
  error: null,
  reloadPost: '',
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    cancelEditPost: (state) => {
      state.isEditing = false;
      state.post = {} as PostDTO;
    },
    setActiveUi: (
      state,
      action: PayloadAction<'list' | 'form' | 'details'>
    ) => {
      state.activeUi = action.payload;
    },
    reloadPostList: (state, action) => {
      state.reloadPost = action.payload;
    },
  },
  extraReducers: {
    [getPost.pending.type]: (state) => {
      state.loading = true;
    },
    [getPost.fulfilled.type]: (state, action) => {
      state.post = action.payload;
      state.loading = false;
    },
    [getPost.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getPostList.pending.type]: (state) => {
      state.loading = true;
    },
    [getPostList.fulfilled.type]: (state, action) => {
      state.postList = action.payload;
      state.loading = false;
    },
    [getPostList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createPost.pending.type]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled.type]: (state) => {
      state.loading = false;
      state.post = {} as PostDTO;
    },
    [createPost.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editPost.pending.type]: (state) => {
      state.loading = true;
    },
    [editPost.fulfilled.type]: (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editPost.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updatePost.pending.type]: (state) => {
      state.loading = true;
    },
    [updatePost.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.post = {} as PostDTO;
    },
    [updatePost.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deletePost.pending.type]: (state) => {
      state.loading = true;
    },
    [deletePost.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deletePost.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditPost, setActiveUi, reloadPostList } =
  postSlice.actions;
