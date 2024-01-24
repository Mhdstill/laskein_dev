import { createSlice } from '@reduxjs/toolkit';
import UserDTO from 'data/dto/User.dto';
import { MemberInitialState } from './membre.interface';
import { createMember } from './useCase/create';
import { deleteMember } from './useCase/delete';
import { editMember } from './useCase/edit';
import { getMember } from './useCase/get';
import { getMemberList } from './useCase/getList';
import { updateMember } from './useCase/update';

const initialState: MemberInitialState = {
  memberList: [],
  member: {} as UserDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadMember: '',
};

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    cancelEditMember: (state) => {
      state.isEditing = false;
      state.member = {} as UserDTO;
    },
    reloadMemberList: (state, action) => {
      state.reloadMember = action.payload;
    },
  },
  extraReducers: {
    [getMember.pending.type]: (state) => {
      state.loading = true;
    },
    [getMember.fulfilled.type]: (state, action) => {
      state.member = action.payload;
      state.loading = false;
    },
    [getMember.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getMemberList.pending.type]: (state) => {
      state.loading = true;
    },
    [getMemberList.fulfilled.type]: (state, action) => {
      state.memberList = action.payload;
      state.loading = false;
    },
    [getMemberList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createMember.pending.type]: (state) => {
      state.loading = true;
    },
    [createMember.fulfilled.type]: (state) => {
      state.loading = false;
      state.member = {} as UserDTO;
    },
    [createMember.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateMember.pending.type]: (state) => {
      state.loading = true;
    },
    [updateMember.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.member = {} as UserDTO;
    },
    [updateMember.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteMember.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteMember.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteMember.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editMember.pending.type]: (state) => {
      state.loading = true;
    },
    [editMember.fulfilled.type]: (state, action) => {
      state.member = action.payload;
      state.isEditing = true;
      state.loading = false;
    },
    [editMember.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditMember, reloadMemberList } = memberSlice.actions;
