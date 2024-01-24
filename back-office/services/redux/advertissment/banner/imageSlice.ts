import { createSlice } from '@reduxjs/toolkit';
import BannerImageDTO from 'data/dto/BannerImage.dto';
import { BannerImageInitialState } from './image.interface';
import { createBannerImage } from './useCase/create';
import { deleteBannerImage } from './useCase/delete';
import { editBannerImage } from './useCase/edit';
import { getBannerImage } from './useCase/get';
import { getBannerImageList } from './useCase/getList';
import { updateBannerImage } from './useCase/update';

const initialState: BannerImageInitialState = {
  bannerImageList: [],
  bannerImage: {} as BannerImageDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadBanner: '',
};

export const bannerImageSlice = createSlice({
  name: 'bannerImage',
  initialState,
  reducers: {
    cancelEditBannerImage: (state) => {
      state.isEditing = false;
      state.bannerImage = {} as BannerImageDTO;
    },
    reloadBannerList: (state, action) => {
      state.reloadBanner = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          [
            getBannerImage.pending.type,
            getBannerImageList.pending.type,
            createBannerImage.pending.type,
            updateBannerImage.pending.type,
            deleteBannerImage.pending.type,
            editBannerImage.pending.type,
          ].includes(action.type),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          [
            getBannerImage.fulfilled.type,
            getBannerImageList.fulfilled.type,
            createBannerImage.fulfilled.type,
            updateBannerImage.fulfilled.type,
            deleteBannerImage.fulfilled.type,
            editBannerImage.fulfilled.type,
          ].includes(action.type),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          [
            getBannerImage.fulfilled.type,
            getBannerImageList.fulfilled.type,
            editBannerImage.fulfilled.type,
          ].includes(action.type),
        (state, action) => {
          state.bannerImage = action.payload;
        }
      )
      .addMatcher(
        (action) => [getBannerImageList.fulfilled.type].includes(action.type),
        (state, action) => {
          state.bannerImageList = action.payload;
        }
      )
      .addMatcher(
        (action) => [createBannerImage.fulfilled.type].includes(action.type),
        (state) => {
          state.bannerImage = {} as BannerImageDTO;
        }
      )
      .addMatcher(
        (action) => [updateBannerImage.fulfilled.type].includes(action.type),
        (state) => {
          state.isEditing = false;
          state.bannerImage = {} as BannerImageDTO;
        }
      )
      .addMatcher(
        (action) =>
          [
            getBannerImage.rejected.type,
            getBannerImageList.rejected.type,
            createBannerImage.rejected.type,
            updateBannerImage.rejected.type,
            deleteBannerImage.rejected.type,
            editBannerImage.rejected.type,
          ].includes(action.type),
        (state, action) => {
          state.error = action.error;
          state.loading = false;
        }
      );
  },
});

export const { cancelEditBannerImage, reloadBannerList } =
  bannerImageSlice.actions;
