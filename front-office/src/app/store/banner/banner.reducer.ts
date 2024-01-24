import { IBannerState } from './banner.model';
import { getAllBanner } from './banner.actions';
import * as fromBanner from './index';
import { createReducer, on } from '@ngrx/store';
import { from, filter } from 'rxjs';

export const initialBannerState: IBannerState = {
  allBanner: [],
  isLoading: false,
};

const reducer = createReducer<IBannerState>(
  initialBannerState,

  // Get all banner
  on(fromBanner.getAllBanner, (state: any) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromBanner.getAllBannerSuccess, (state, { allBanner }) => {
    return {
      ...state,
      isLoading: false,
      allBanner,
    };
  })
);

export function bannerReducer(
  state = initialBannerState,
  actions: any
): IBannerState {
  return reducer(state, actions);
}
