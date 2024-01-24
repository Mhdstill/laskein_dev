import { createSlice } from '@reduxjs/toolkit';
import DailyRewardDTO from 'data/dto/DailyReward';
import { DailyRewardInitialState } from './dailyReward.interface';
import { createDailyReward } from './useCase/create';
import { deleteDailyReward } from './useCase/delete';
import { editDailyReward } from './useCase/edit';
import { getDailyReward } from './useCase/get';
import { getDailyRewardList } from './useCase/getList';
import { updateDailyReward } from './useCase/update';

const initialState: DailyRewardInitialState = {
  dailyRewardList: [],
  dailyReward: {} as DailyRewardDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadDailyReward: '',
};

export const dailyRewardSlice = createSlice({
  name: 'dailyReward',
  initialState,
  reducers: {
    cancelEditDailyReward: (state) => {
      state.isEditing = false;
      state.dailyReward = {} as DailyRewardDTO;
    },
    reloadBannerList: (state, action) => {
      state.reloadDailyReward = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          [
            getDailyReward.pending.type,
            getDailyRewardList.pending.type,
            createDailyReward.pending.type,
            updateDailyReward.pending.type,
            deleteDailyReward.pending.type,
            editDailyReward.pending.type,
          ].includes(action.type),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          [
            getDailyReward.fulfilled.type,
            getDailyRewardList.fulfilled.type,
            createDailyReward.fulfilled.type,
            updateDailyReward.fulfilled.type,
            deleteDailyReward.fulfilled.type,
            editDailyReward.fulfilled.type,
          ].includes(action.type),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          [
            getDailyReward.fulfilled.type,
            editDailyReward.fulfilled.type,
          ].includes(action.type),
        (state, action) => {
          state.dailyReward = action.payload;
        }
      )
      .addMatcher(
        (action) => [editDailyReward.fulfilled.type].includes(action.type),
        (state) => {
          state.isEditing = true;
        }
      )
      .addMatcher(
        (action) => [getDailyRewardList.fulfilled.type].includes(action.type),
        (state, action) => {
          state.dailyRewardList = action.payload;
        }
      )
      .addMatcher(
        (action) => [createDailyReward.fulfilled.type].includes(action.type),
        (state) => {
          state.dailyReward = {} as DailyRewardDTO;
        }
      )
      .addMatcher(
        (action) => [updateDailyReward.fulfilled.type].includes(action.type),
        (state) => {
          state.isEditing = false;
          state.dailyReward = {} as DailyRewardDTO;
        }
      )
      .addMatcher(
        (action) =>
          [
            getDailyReward.rejected.type,
            getDailyRewardList.rejected.type,
            createDailyReward.rejected.type,
            updateDailyReward.rejected.type,
            deleteDailyReward.rejected.type,
            editDailyReward.rejected.type,
          ].includes(action.type),
        (state, action) => {
          state.error = action.error;
          state.loading = false;
        }
      );
  },
});

export const { cancelEditDailyReward, reloadBannerList } =
  dailyRewardSlice.actions;
