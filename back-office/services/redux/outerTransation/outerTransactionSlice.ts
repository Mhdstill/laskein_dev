import { createSlice } from '@reduxjs/toolkit';
import OuterTransactionDTO from 'data/dto/OuterTransaction.dto';
import { OuterTransactionInitialState } from './outerTransaction.interface';
import { createOuterTransaction } from './useCase/create';
import { deleteOuterTransaction } from './useCase/delete';
import { editOuterTransaction } from './useCase/edit';
import { getOuterTransaction } from './useCase/get';
import { getOuterTransactionList } from './useCase/getList';
import { updateOuterTransaction } from './useCase/update';

const initialState: OuterTransactionInitialState = {
  outerTransactionList: [],
  outerTransaction: {} as OuterTransactionDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadOuterTransactionList: '',
};

export const outerTransactionSlice = createSlice({
  name: 'outerTransaction',
  initialState,
  reducers: {
    cancelEditOuterTransaction: (state) => {
      state.isEditing = false;
      state.outerTransaction = {} as OuterTransactionDTO;
    },
    reloadOuterTransactionList: (state, action) => {
      state.reloadOuterTransactionList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          [
            getOuterTransaction.pending.type,
            getOuterTransactionList.pending.type,
            createOuterTransaction.pending.type,
            updateOuterTransaction.pending.type,
            deleteOuterTransaction.pending.type,
            editOuterTransaction.pending.type,
          ].includes(action.type),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          [
            getOuterTransaction.fulfilled.type,
            getOuterTransactionList.fulfilled.type,
            createOuterTransaction.fulfilled.type,
            updateOuterTransaction.fulfilled.type,
            deleteOuterTransaction.fulfilled.type,
            editOuterTransaction.fulfilled.type,
          ].includes(action.type),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          [
            getOuterTransaction.fulfilled.type,
            editOuterTransaction.fulfilled.type,
          ].includes(action.type),
        (state, action) => {
          state.outerTransaction = action.payload;
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => [editOuterTransaction.fulfilled.type].includes(action.type),
        (state) => {
          state.isEditing = true;
        }
      )
      .addMatcher(
        (action) =>
          [getOuterTransactionList.fulfilled.type].includes(action.type),
        (state, action) => {
          state.outerTransactionList = action.payload;
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          [createOuterTransaction.fulfilled.type].includes(action.type),
        (state) => {
          state.outerTransaction = {} as OuterTransactionDTO;
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          [updateOuterTransaction.fulfilled.type].includes(action.type),
        (state) => {
          state.isEditing = false;
          state.outerTransaction = {} as OuterTransactionDTO;
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          [
            getOuterTransaction.rejected.type,
            getOuterTransactionList.rejected.type,
            createOuterTransaction.rejected.type,
            updateOuterTransaction.rejected.type,
            deleteOuterTransaction.rejected.type,
            editOuterTransaction.rejected.type,
          ].includes(action.type),
        (state, action) => {
          state.error = action.error;
          state.loading = false;
        }
      );
  },
});

export const { cancelEditOuterTransaction, reloadOuterTransactionList } =
  outerTransactionSlice.actions;
