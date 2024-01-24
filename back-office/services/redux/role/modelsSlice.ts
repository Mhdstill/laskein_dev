import { createSlice } from '@reduxjs/toolkit';
import RuleDTO from '../../../data/dto/Rule.dto';
import { RoleInitialState } from './models.interface';
import { createRole } from './useCase/create';
import { deleteRole } from './useCase/delete';
import { editRole } from './useCase/edit';
import { getRole } from './useCase/get';
import { getRoleList } from './useCase/getList';
import { updateRole } from './useCase/update';

const initialState: RoleInitialState = {
  roleList: [],
  role: {} as RuleDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadRole: '',
};

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    cancelEditRole: (state) => {
      state.isEditing = false;
      state.role = {} as RuleDTO;
    },
    reloadRoleList: (state, action) => {
      state.reloadRole = action.payload;
    },
  },
  extraReducers: {
    [getRole.pending.type]: (state) => {
      state.loading = true;
    },
    [getRole.fulfilled.type]: (state, action) => {
      state.role = action.payload;
      state.loading = false;
    },
    [getRole.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getRoleList.pending.type]: (state) => {
      state.loading = true;
    },
    [getRoleList.fulfilled.type]: (state, action) => {
      state.roleList = action.payload;
      state.loading = false;
    },
    [getRoleList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createRole.pending.type]: (state) => {
      state.loading = true;
    },
    [createRole.fulfilled.type]: (state) => {
      state.loading = false;
      state.role = {} as RuleDTO;
    },
    [createRole.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateRole.pending.type]: (state) => {
      state.loading = true;
    },
    [updateRole.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.role = {} as RuleDTO;
    },
    [updateRole.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteRole.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteRole.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteRole.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editRole.pending.type]: (state) => {
      state.loading = true;
    },
    [editRole.fulfilled.type]: (state, action) => {
      state.role = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editRole.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditRole, reloadRoleList } = roleSlice.actions;
