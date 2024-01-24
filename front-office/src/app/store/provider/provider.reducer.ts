import { IProviderState } from './provider.model';
import { getAllProvider } from './provider.actions';
import * as fromProvider from './index';
import { createReducer, on } from '@ngrx/store';
import { from, filter } from 'rxjs';

export const initialProviderState: IProviderState = {
  allProvider: [],
  isLoading: false,
};

const reducer = createReducer<IProviderState>(
  initialProviderState,

  // Get all provider
  on(fromProvider.getAllProvider, (state: any) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromProvider.getAllProviderSuccess, (state, { allProvider }) => {
    return {
      ...state,
      isLoading: false,
      allProvider,
    };
  })
);

export function providerReducer(
  state = initialProviderState,
  actions: any
): IProviderState {
  return reducer(state, actions);
}
