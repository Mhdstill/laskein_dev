import { createSlice } from '@reduxjs/toolkit';
import NewsLetterDTO from 'data/dto/NewsLetter.dto';
import { NewsLetterInitialState } from './newsLetter.interface';
import { deleteNewsLetter } from './useCase/delete';
import { getNewsLetter } from './useCase/get';
import { getNewsLetterList } from './useCase/getList';

const initialState: NewsLetterInitialState = {
  newsLetterList: [],
  newsLetter: {} as NewsLetterDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadNewsLetter: '',
};

export const newsLetterSlice = createSlice({
  name: 'newsLetter',
  initialState,
  reducers: {
    cancelEditNewsLetter: (state) => {
      state.isEditing = false;
      state.newsLetter = {} as NewsLetterDTO;
    },
    reloadNewsLetterList: (state, action) => {
      state.reloadNewsLetter = action.payload;
    },
  },
  extraReducers: {
    [getNewsLetter.pending.type]: (state) => {
      state.loading = true;
    },
    [getNewsLetter.fulfilled.type]: (state, action) => {
      state.newsLetter = action.payload;
      state.loading = false;
    },
    [getNewsLetter.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getNewsLetterList.pending.type]: (state) => {
      state.loading = true;
    },
    [getNewsLetterList.fulfilled.type]: (state, action) => {
      state.newsLetterList = action.payload;
      state.loading = false;
    },
    [getNewsLetterList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteNewsLetter.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteNewsLetter.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteNewsLetter.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditNewsLetter, reloadNewsLetterList } =
  newsLetterSlice.actions;
