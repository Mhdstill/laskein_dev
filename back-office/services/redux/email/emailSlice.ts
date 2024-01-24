import { createSlice } from '@reduxjs/toolkit';
import EmailDTO from 'data/dto/Email.dto';
import { EmailInitialState } from './email.interface';
import { getEmail } from './useCase/get';
import { getEmailList } from './useCase/getList';

const initialState: EmailInitialState = {
  emailList: [],
  email: {} as EmailDTO,
  isEditing: false,
  loading: false,
  error: null,
};

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    cancelEditEmail: (state) => {
      state.isEditing = false;
      state.email = {} as EmailDTO;
    },
  },
  extraReducers: {
    [getEmail.pending.type]: (state) => {
      state.loading = true;
    },
    [getEmail.fulfilled.type]: (state, action) => {
      state.email = action.payload;
      state.loading = false;
    },
    [getEmail.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getEmailList.pending.type]: (state) => {
      state.loading = true;
    },
    [getEmailList.fulfilled.type]: (state, action) => {
      state.emailList = action.payload;
      state.loading = false;
    },
    [getEmailList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditEmail } = emailSlice.actions;
