import { createAction, props } from '@ngrx/store';
import { IBox } from './box.interface';

const prefix = '[Box]';

//--------- get all box -------//
export const getAllBox = createAction(`${prefix} Get all box`);
export const getAllBoxSuccess = createAction(
  `${getAllBox.type} Success`,
  props<{
    allBox: IBox[];
  }>()
);
