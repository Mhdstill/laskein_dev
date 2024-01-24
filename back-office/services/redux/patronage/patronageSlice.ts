import { createSlice } from '@reduxjs/toolkit';
import PatronageDTO from 'data/dto/Patronage.dto';
import { PatronageInitialState } from './patronage.interface';
import { getPatronage } from './useCase/get';
import { getPatronageList } from './useCase/getList';

const initialState: PatronageInitialState = {
  patronageList: [],
  patronage: {} as PatronageDTO,
  isEditing: false,
  loading: false,
  error: null,
};

export const patronageSlice = createSlice({
  name: 'patronage',
  initialState,
  reducers: {
    cancelEditPatronage: (state) => {
      state.isEditing = false;
      state.patronage = {} as PatronageDTO;
    },
  },
  extraReducers: {
    [getPatronage.pending.type]: (state) => {
      state.loading = true;
    },
    [getPatronage.fulfilled.type]: (state, action) => {
      state.patronage = action.payload;
      state.loading = false;
    },
    [getPatronage.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getPatronageList.pending.type]: (state) => {
      state.loading = true;
    },
    [getPatronageList.fulfilled.type]: (state, action) => {
      state.patronageList = action.payload;
      state.loading = false;
    },
    [getPatronageList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditPatronage } = patronageSlice.actions;
