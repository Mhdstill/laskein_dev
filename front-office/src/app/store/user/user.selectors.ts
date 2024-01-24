import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from './user.model';

export const selectUserState = createFeatureSelector<IUserState>('user');
export const selectUserById = createSelector(
  selectUserState,
  state => state.user
);
export const selectUserIsLoading = createSelector(
  selectUserState,
  state => state.isLoading
);
