import { createSlice } from '@reduxjs/toolkit';
import HistoricalDTO from 'data/dto/Historical.dto';
import { HistoricalInitialState } from './historical.interface';
import { getHistorical } from './useCase/get';
import { getHistoricalList } from './useCase/getList';

const initialState: HistoricalInitialState = {
  historicaList: [],
  historical: {} as HistoricalDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadHistorical: '',
};

export const historicalSlice = createSlice({
  name: 'historical',
  initialState,
  reducers: {
    cancelEditHistorical: (state) => {
      state.isEditing = false;
      state.historical = {} as HistoricalDTO;
    },
    reloadHistoricalList: (state, action) => {
      state.reloadHistorical = action.payload;
    },
  },
  extraReducers: {
    [getHistorical.pending.type]: (state) => {
      state.loading = true;
    },
    [getHistorical.fulfilled.type]: (state, action) => {
      state.historical = action.payload;
      state.loading = false;
    },
    [getHistorical.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getHistoricalList.pending.type]: (state) => {
      state.loading = true;
    },
    [getHistoricalList.fulfilled.type]: (state, action) => {
      state.historicaList = action.payload;
      state.loading = false;
    },
    [getHistoricalList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditHistorical, reloadHistoricalList } =
  historicalSlice.actions;
