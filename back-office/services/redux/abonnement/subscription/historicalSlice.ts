import { createSlice } from '@reduxjs/toolkit';
import SubscriptionDTO from 'data/dto/subscription.dto';
import { SubscriptionInitialState } from './historical.interface';
import { getSubscription } from './useCase/get';
import { getSubscriptionList } from './useCase/getList';

const initialState: SubscriptionInitialState = {
  subscriptionList: [],
  subscription: {} as SubscriptionDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadSubscription: '',
};

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    cancelEditSubscription: (state) => {
      state.isEditing = false;
      state.subscription = {} as SubscriptionDTO;
    },
    reloadSubscriptionList: (state, action) => {
      state.reloadSubscription = action.payload;
    },
  },
  extraReducers: {
    [getSubscription.pending.type]: (state) => {
      state.loading = true;
    },
    [getSubscription.fulfilled.type]: (state, action) => {
      state.subscription = action.payload;
      state.loading = false;
    },
    [getSubscription.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getSubscriptionList.pending.type]: (state) => {
      state.loading = true;
    },
    [getSubscriptionList.fulfilled.type]: (state, action) => {
      state.subscriptionList = action.payload;
      state.loading = false;
    },
    [getSubscriptionList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditSubscription, reloadSubscriptionList } =
  subscriptionSlice.actions;
