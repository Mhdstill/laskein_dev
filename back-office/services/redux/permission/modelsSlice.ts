import { createSlice } from '@reduxjs/toolkit';
import PermissionDTO from '../../../data/dto/Permission.dto';
import { PermisssionInitialState } from './models.interface';
import { createPermission } from './useCase/create';
import { deletePermission } from './useCase/delete';
import { editPermission } from './useCase/edit';
import { getPermission } from './useCase/get';
import { getPermissionList } from './useCase/getList';
import { updatePermission } from './useCase/update';

const initialState: PermisssionInitialState = {
  permissionList: [],
  permission: {} as PermissionDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadPermission: '',
};

export const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    cancelEditPermission: (state) => {
      state.isEditing = false;
      state.permission = {} as PermissionDTO;
    },
    reloadPermissionList: (state, action) => {
      state.reloadPermission = action.payload;
    },
  },
  extraReducers: {
    [getPermission.pending.type]: (state) => {
      state.loading = true;
    },
    [getPermission.fulfilled.type]: (state, action) => {
      state.permission = action.payload;
      state.loading = false;
    },
    [getPermission.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getPermissionList.pending.type]: (state) => {
      state.loading = true;
    },
    [getPermissionList.fulfilled.type]: (state, action) => {
      state.permissionList = action.payload;
      state.loading = false;
    },
    [getPermissionList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createPermission.pending.type]: (state) => {
      state.loading = true;
    },
    [createPermission.fulfilled.type]: (state) => {
      state.loading = false;
      state.permission = {} as PermissionDTO;
    },
    [createPermission.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updatePermission.pending.type]: (state) => {
      state.loading = true;
    },
    [updatePermission.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.permission = {} as PermissionDTO;
    },
    [updatePermission.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deletePermission.pending.type]: (state) => {
      state.loading = true;
    },
    [deletePermission.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deletePermission.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editPermission.pending.type]: (state) => {
      state.loading = true;
    },
    [editPermission.fulfilled.type]: (state, action) => {
      state.permission = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editPermission.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditPermission, reloadPermissionList } =
  permissionSlice.actions;
