import { createSlice } from '@reduxjs/toolkit';
import { FileInitialState } from './file.interface';
import { postFile } from './useCase/postFile';

const initialState: FileInitialState = {
  fileList: [],
  file: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(postFile.fulfilled, (state, action) => {
        state.file = action.payload;
        state.loading = false;
      })
      .addCase(postFile.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});
