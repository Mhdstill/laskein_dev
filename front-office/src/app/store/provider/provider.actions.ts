import { createAction, props } from '@ngrx/store';
import { ProviderDTO } from './provider.interface';

const prefix = '[Provider]';

//--------- get all provider -------//
export const getAllProvider = createAction(`${prefix} Get all provider`);
export const getAllProviderSuccess = createAction(
  `${getAllProvider.type} Success`,
  props<{
    allProvider: ProviderDTO[];
  }>()
);
