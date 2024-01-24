import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBannerState } from './banner.model';

export const selectBannerState = createFeatureSelector<IBannerState>('banner');
export const selectBannerList = createSelector(
  selectBannerState,
  state => state.allBanner
);
export const selectBannerIsLoading = createSelector(
  selectBannerState,
  state => state.isLoading
);
