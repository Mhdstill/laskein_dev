import { createSlice } from '@reduxjs/toolkit';
import BankDTO from 'data/dto/Bank.dto';
import { BankInitialState } from './newsLetter.interface';
import { deleteBank } from './useCase/delete';
import { getBank } from './useCase/get';
import { getBankList } from './useCase/getList';

const initialState: BankInitialState = {
  bankList: [],
  bank: {} as BankDTO,
  isEditing: false,
  loading: false,
  error: null,
};

export const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    cancelEditBank: (state) => {
      state.isEditing = false;
      state.bank = {} as BankDTO;
    },
  },
  extraReducers: {
    [getBank.pending.type]: (state) => {
      state.loading = true;
    },
    [getBank.fulfilled.type]: (state, action) => {
      state.bank = action.payload;
      state.loading = false;
    },
    [getBank.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getBankList.pending.type]: (state) => {
      state.loading = true;
    },
    [getBankList.fulfilled.type]: (state, action) => {
      state.bankList = action.payload;
      state.loading = false;
    },
    [getBankList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteBank.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteBank.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteBank.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditBank } = bankSlice.actions;
