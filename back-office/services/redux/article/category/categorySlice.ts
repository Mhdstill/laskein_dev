import { createSlice } from '@reduxjs/toolkit';
import CategoryDTO from '../../../../data/dto/Category.dto';
import { CategoryInitialState } from './category.interface';
import { createCategory } from './useCase/create';
import { deleteCategory } from './useCase/delete';
import { editCategory } from './useCase/edit';
import { getCategory } from './useCase/get';
import { getCategoryList } from './useCase/getList';
import { updateCategory } from './useCase/update';

const initialState: CategoryInitialState = {
  categoryList: [],
  category: {} as CategoryDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadCategory: '',
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    cancelEditCategory: (state) => {
      state.isEditing = false;
      state.category = {} as CategoryDTO;
    },
    reloadCategoryList: (state, action) => {
      state.reloadCategory = action.payload;
    },
  },
  extraReducers: {
    [getCategory.pending.type]: (state) => {
      state.loading = true;
    },
    [getCategory.fulfilled.type]: (state, action) => {
      state.category = action.payload;
      state.loading = false;
    },
    [getCategory.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getCategoryList.pending.type]: (state) => {
      state.loading = true;
    },
    [getCategoryList.fulfilled.type]: (state, action) => {
      state.categoryList = action.payload;
      state.loading = false;
    },
    [getCategoryList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createCategory.pending.type]: (state) => {
      state.loading = true;
    },
    [createCategory.fulfilled.type]: (state) => {
      state.loading = false;
      state.category = {} as CategoryDTO;
    },
    [createCategory.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateCategory.pending.type]: (state) => {
      state.loading = true;
    },
    [updateCategory.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.category = {} as CategoryDTO;
    },
    [updateCategory.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteCategory.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteCategory.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteCategory.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editCategory.pending.type]: (state) => {
      state.loading = true;
    },
    [editCategory.fulfilled.type]: (state, action) => {
      state.category = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editCategory.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditCategory, reloadCategoryList } = categorySlice.actions;
