import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProviderState } from './provider.model';

export const selectProviderState =
  createFeatureSelector<IProviderState>('provider');
export const selectProviderList = createSelector(
  selectProviderState,
  state => state.allProvider
);
export const selectProviderIsLoading = createSelector(
  selectProviderState,
  state => state.isLoading
);
