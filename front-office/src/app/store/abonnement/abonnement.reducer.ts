import { IAbonnementState } from './abonnement.model';
import { getAllAbonnement } from './abonnement.actions';
import * as fromAbonnement from './index';
import { createReducer, on } from '@ngrx/store';
import { from, filter } from 'rxjs';

export const initialAbonnementState: IAbonnementState = {
  allAbonnement: [],
  isLoading: false,
};

const reducer = createReducer<IAbonnementState>(
  initialAbonnementState,

  // Get all abonnement
  on(fromAbonnement.getAllAbonnement, (state: any) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromAbonnement.getAllAbonnementSuccess, (state, { allAbonnement }) => {
    return {
      ...state,
      isLoading: false,
      allAbonnement,
    };
  })
);

export function abonnementReducer(
  state = initialAbonnementState,
  actions: any
): IAbonnementState {
  return reducer(state, actions);
}
