import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAbonnementState } from './abonnement.model';

export const selectAbonnementState =
  createFeatureSelector<IAbonnementState>('abonnement');
export const selectAbonnementList = createSelector(
  selectAbonnementState,
  state => state.allAbonnement
);
export const selectAbonnementIsLoading = createSelector(
  selectAbonnementState,
  state => state.isLoading
);
