import { IBoxState } from './box.model';
import { getAllBox } from './box.actions';
import * as fromBox from './index';
import { createReducer, on } from '@ngrx/store';
import { from, filter } from 'rxjs';

export const initialBoxState: IBoxState = {
  allBox: [],
  isLoading: false,
};

const reducer = createReducer<IBoxState>(
  initialBoxState,

  // Get all box
  on(fromBox.getAllBox, (state: any) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromBox.getAllBoxSuccess, (state, { allBox }) => {
    return {
      ...state,
      isLoading: false,
      allBox,
    };
  })
);

export function boxReducer(state = initialBoxState, actions: any): IBoxState {
  return reducer(state, actions);
}
