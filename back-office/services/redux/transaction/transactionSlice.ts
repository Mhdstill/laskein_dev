import { createSlice } from '@reduxjs/toolkit';
import TransactionDTO from 'data/dto/Transaction.dto';
import { TransactionInitialState } from './transaction.interface';
import { createTransaction } from './useCase/create';
import { deleteTransaction } from './useCase/delete';
import { editTransaction } from './useCase/edit';
import { getTransaction } from './useCase/get';
import { getTransactionList } from './useCase/getList';
import { updateTransaction } from './useCase/update';

const initialState: TransactionInitialState = {
  transactionList: [],
  transaction: {} as TransactionDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadTransactionList: '',
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    cancelEditTransaction: (state) => {
      state.isEditing = false;
      state.transaction = {} as TransactionDTO;
    },
    reloadTransactionList: (state, action) => {
      state.reloadTransactionList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          [
            getTransaction.pending.type,
            getTransactionList.pending.type,
            createTransaction.pending.type,
            updateTransaction.pending.type,
            deleteTransaction.pending.type,
            editTransaction.pending.type,
          ].includes(action.type),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          [
            getTransaction.fulfilled.type,
            getTransactionList.fulfilled.type,
            createTransaction.fulfilled.type,
            updateTransaction.fulfilled.type,
            deleteTransaction.fulfilled.type,
            editTransaction.fulfilled.type,
          ].includes(action.type),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          [
            getTransaction.fulfilled.type,
            editTransaction.fulfilled.type,
          ].includes(action.type),
        (state, action) => {
          state.transaction = action.payload;
          state.isEditing = true;
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => [getTransactionList.fulfilled.type].includes(action.type),
        (state, action) => {
          state.transactionList = action.payload;
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => [createTransaction.fulfilled.type].includes(action.type),
        (state) => {
          state.transaction = {} as TransactionDTO;
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => [updateTransaction.fulfilled.type].includes(action.type),
        (state) => {
          state.isEditing = false;
          state.transaction = {} as TransactionDTO;
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          [
            getTransaction.rejected.type,
            getTransactionList.rejected.type,
            createTransaction.rejected.type,
            updateTransaction.rejected.type,
            deleteTransaction.rejected.type,
            editTransaction.rejected.type,
          ].includes(action.type),
        (state, action) => {
          state.error = action.error;
          state.loading = false;
        }
      );
  },
});

export const { cancelEditTransaction, reloadTransactionList } =
  transactionSlice.actions;
