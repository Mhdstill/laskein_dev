import { createAction, props } from '@ngrx/store';
import { BannerDTO } from './banner.interface';

const prefix = '[Banner]';

//--------- get all banner -------//
export const getAllBanner = createAction(`${prefix} Get all banner`);
export const getAllBannerSuccess = createAction(
  `${getAllBanner.type} Success`,
  props<{
    allBanner: BannerDTO[];
  }>()
);
