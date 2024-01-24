import { createSlice } from '@reduxjs/toolkit';
import BoxRewardLevelDTO from 'data/dto/BoxRewardLevel.dto';
import { BoxRewardLevelInitialState } from './boxRewardLevel.interface';
import { createBoxRewardLevel } from './useCase/create';
import { deleteBoxRewardLevel } from './useCase/delete';
import { editBoxRewardLevel } from './useCase/edit';
import { getBoxRewardLevel } from './useCase/get';
import { getBoxRewardLevelList } from './useCase/getList';
import { updateBoxRewardLevel } from './useCase/update';

const initialState: BoxRewardLevelInitialState = {
  boxRewardLevelList: [],
  boxRewardLevel: {} as BoxRewardLevelDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadBoxRewardLevel: '',
};

export const boxRewardLevelSlice = createSlice({
  name: 'boxRewardLevel',
  initialState,
  reducers: {
    cancelEditBoxRewardLevel: (state) => {
      state.isEditing = false;
      state.boxRewardLevel = {} as BoxRewardLevelDTO;
    },
    reloadBoxRewardLevelList: (state, action) => {
      state.boxRewardLevelList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          [
            getBoxRewardLevel.pending.type,
            getBoxRewardLevelList.pending.type,
            createBoxRewardLevel.pending.type,
            updateBoxRewardLevel.pending.type,
            deleteBoxRewardLevel.pending.type,
            editBoxRewardLevel.pending.type,
          ].includes(action.type),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          [
            getBoxRewardLevel.fulfilled.type,
            getBoxRewardLevelList.fulfilled.type,
            createBoxRewardLevel.fulfilled.type,
            updateBoxRewardLevel.fulfilled.type,
            deleteBoxRewardLevel.fulfilled.type,
            editBoxRewardLevel.fulfilled.type,
          ].includes(action.type),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          [
            getBoxRewardLevel.fulfilled.type,
            editBoxRewardLevel.fulfilled.type,
          ].includes(action.type),
        (state, action) => {
          state.boxRewardLevel = action.payload;
        }
      )
      .addMatcher(
        (action) => [editBoxRewardLevel.fulfilled.type].includes(action.type),
        (state) => {
          state.isEditing = true;
        }
      )
      .addMatcher(
        (action) =>
          [getBoxRewardLevelList.fulfilled.type].includes(action.type),
        (state, action) => {
          state.boxRewardLevelList = action.payload;
        }
      )
      .addMatcher(
        (action) => [createBoxRewardLevel.fulfilled.type].includes(action.type),
        (state) => {
          state.boxRewardLevel = {} as BoxRewardLevelDTO;
        }
      )
      .addMatcher(
        (action) => [updateBoxRewardLevel.fulfilled.type].includes(action.type),
        (state) => {
          state.isEditing = false;
          state.boxRewardLevel = {} as BoxRewardLevelDTO;
        }
      )
      .addMatcher(
        (action) =>
          [
            getBoxRewardLevel.rejected.type,
            getBoxRewardLevelList.rejected.type,
            createBoxRewardLevel.rejected.type,
            updateBoxRewardLevel.rejected.type,
            deleteBoxRewardLevel.rejected.type,
            editBoxRewardLevel.rejected.type,
          ].includes(action.type),
        (state, action) => {
          state.error = action.error;
          state.loading = false;
        }
      );
  },
});

export const { cancelEditBoxRewardLevel, reloadBoxRewardLevelList } =
  boxRewardLevelSlice.actions;
