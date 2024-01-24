import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import RewardLevelDTO from 'data/dto/RewardLevel.dto';
import { RewardLevelInitialState } from './rewardLevel.interface';
import { createRewardLevel } from './useCase/create';
import { deleteRewardLevel } from './useCase/delete';
import { editRewardLevel } from './useCase/edit';
import { getRewardLevel } from './useCase/get';
import { getRewardLevelList } from './useCase/getList';
import { updateRewardLevel } from './useCase/update';

const initialState: RewardLevelInitialState = {
  rewardLevelList: [],
  rewardLevel: {} as RewardLevelDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadRewardLevel: '',
  showBoxRewardLevel: false,
  activeUi: 'list',
};

export const rewardLevelSlice = createSlice({
  name: 'rewardLevel',
  initialState,
  reducers: {
    cancelEditRewardLevel: (state) => {
      state.isEditing = false;
      state.rewardLevel = {} as RewardLevelDTO;
    },
    reloadRewardLevel: (state, action) => {
      state.rewardLevelList = action.payload;
    },
    setActiveUi: (
      state,
      action: PayloadAction<'list' | 'form' | 'details' | 'box'>
    ) => {
      state.activeUi = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          [
            getRewardLevel.pending.type,
            getRewardLevelList.pending.type,
            createRewardLevel.pending.type,
            updateRewardLevel.pending.type,
            deleteRewardLevel.pending.type,
            editRewardLevel.pending.type,
          ].includes(action.type),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          [
            getRewardLevel.fulfilled.type,
            getRewardLevelList.fulfilled.type,
            createRewardLevel.fulfilled.type,
            updateRewardLevel.fulfilled.type,
            deleteRewardLevel.fulfilled.type,
            editRewardLevel.fulfilled.type,
          ].includes(action.type),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          [
            getRewardLevel.fulfilled.type,
            editRewardLevel.fulfilled.type,
          ].includes(action.type),
        (state, action) => {
          state.rewardLevel = action.payload;
        }
      )
      .addMatcher(
        (action) => [editRewardLevel.fulfilled.type].includes(action.type),
        (state) => {
          state.isEditing = true;
        }
      )
      .addMatcher(
        (action) => [getRewardLevelList.fulfilled.type].includes(action.type),
        (state, action) => {
          state.rewardLevelList = action.payload;
        }
      )
      .addMatcher(
        (action) => [createRewardLevel.fulfilled.type].includes(action.type),
        (state) => {
          state.rewardLevel = {} as RewardLevelDTO;
        }
      )
      .addMatcher(
        (action) => [updateRewardLevel.fulfilled.type].includes(action.type),
        (state) => {
          state.isEditing = false;
          state.rewardLevel = {} as RewardLevelDTO;
        }
      )
      .addMatcher(
        (action) =>
          [
            getRewardLevel.rejected.type,
            getRewardLevelList.rejected.type,
            createRewardLevel.rejected.type,
            updateRewardLevel.rejected.type,
            deleteRewardLevel.rejected.type,
            editRewardLevel.rejected.type,
          ].includes(action.type),
        (state, action) => {
          state.error = action.error;
          state.loading = false;
        }
      );
  },
});

export const { cancelEditRewardLevel, reloadRewardLevel, setActiveUi } =
  rewardLevelSlice.actions;
