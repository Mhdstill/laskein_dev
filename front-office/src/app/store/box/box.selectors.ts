import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBoxState } from './box.model';

export const selectBoxState = createFeatureSelector<IBoxState>('box');
export const selectBoxList = createSelector(
  selectBoxState,
  state => state.allBox
);
export const selectBoxIsLoading = createSelector(
  selectBoxState,
  state => state.isLoading
);
