import { createSlice } from '@reduxjs/toolkit';
import ProviderDTO from '../../../../data/dto/Provider.dto';
import { ProviderInitialState } from './provider.interface';
import { createProvider } from './useCase/create';
import { deleteProvider } from './useCase/delete';
import { editProvider } from './useCase/edit';
import { getProvider } from './useCase/get';
import { getProviderList } from './useCase/getList';
import { getPinnedProviders } from './useCase/getPinned';
import { updateProvider } from './useCase/update';

const initialState: ProviderInitialState = {
  providerList: [],
  pinnedProviders: [],
  provider: {} as ProviderDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadProvider: '',
};

export const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    cancelEditProvider: (state) => {
      state.isEditing = false;
      state.provider = {} as ProviderDTO;
    },
    reloadProviderList: (state, action) => {
      state.reloadProvider = action.payload;
    },
  },
  extraReducers: {
    [getProvider.pending.type]: (state) => {
      state.loading = true;
    },
    [getProvider.fulfilled.type]: (state, action) => {
      state.provider = action.payload;
      state.loading = false;
    },
    [getProvider.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getProviderList.pending.type]: (state) => {
      state.loading = true;
    },
    [getProviderList.fulfilled.type]: (state, action) => {
      state.providerList = action.payload;
      state.loading = false;
    },
    [getProviderList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getPinnedProviders.pending.type]: (state) => {
      state.loading = true;
    },
    [getPinnedProviders.fulfilled.type]: (state, action) => {
      state.pinnedProviders = action.payload;
      state.loading = false;
    },
    [getPinnedProviders.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createProvider.pending.type]: (state) => {
      state.loading = true;
    },
    [createProvider.fulfilled.type]: (state) => {
      state.loading = false;
      state.provider = {} as ProviderDTO;
    },
    [createProvider.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateProvider.pending.type]: (state) => {
      state.loading = true;
    },
    [updateProvider.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.provider = {} as ProviderDTO;
    },
    [updateProvider.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteProvider.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteProvider.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteProvider.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editProvider.pending.type]: (state) => {
      state.loading = true;
    },
    [editProvider.fulfilled.type]: (state, action) => {
      state.provider = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editProvider.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditProvider, reloadProviderList } = providerSlice.actions;
