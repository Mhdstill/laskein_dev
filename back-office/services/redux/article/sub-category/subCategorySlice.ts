import { createSlice } from '@reduxjs/toolkit';
import SubCategoryDTO from '../../../../data/dto/SubCategory.dto';
import { SubCategoryInitialState } from './sub.category.interface';
import { createSubCategory } from './useCase/create';
import { deleteSubCategory } from './useCase/delete';
import { editSubCategory } from './useCase/edit';
import { getSubCategory } from './useCase/get';
import { getSubCategoryList } from './useCase/getList';
import { updateSubCategory } from './useCase/update';

const initialState: SubCategoryInitialState = {
  subCategoryList: [],
  subCategory: {} as SubCategoryDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadSubCategory: '',
};

export const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState,
  reducers: {
    cancelEditSubCategory: (state) => {
      state.isEditing = false;
      state.subCategory = {} as SubCategoryDTO;
    },
    reloadSubCategoryList: (state, action) => {
      state.reloadSubCategory = action.payload;
    },
  },
  extraReducers: {
    [getSubCategory.pending.type]: (state) => {
      state.loading = true;
    },
    [getSubCategory.fulfilled.type]: (state, action) => {
      state.subCategory = action.payload;
      state.loading = false;
    },
    [getSubCategory.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getSubCategoryList.pending.type]: (state) => {
      state.loading = true;
    },
    [getSubCategoryList.fulfilled.type]: (state, action) => {
      state.subCategoryList = action.payload;
      state.loading = false;
    },
    [getSubCategoryList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createSubCategory.pending.type]: (state) => {
      state.loading = true;
    },
    [createSubCategory.fulfilled.type]: (state) => {
      state.loading = false;
      state.subCategory = {} as SubCategoryDTO;
    },
    [createSubCategory.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateSubCategory.pending.type]: (state) => {
      state.loading = true;
    },
    [updateSubCategory.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.subCategory = {} as SubCategoryDTO;
    },
    [updateSubCategory.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteSubCategory.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteSubCategory.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteSubCategory.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editSubCategory.pending.type]: (state) => {
      state.loading = true;
    },
    [editSubCategory.fulfilled.type]: (state, action) => {
      state.subCategory = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editSubCategory.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditSubCategory, reloadSubCategoryList } =
  subCategorySlice.actions;
