import { createAction, props } from '@ngrx/store';
import { IAbonnement } from './abonnement.interface';

const prefix = '[Abonnement]';

//--------- get all abonnement -------//
export const getAllAbonnement = createAction(`${prefix} Get all abonnement`);
export const getAllAbonnementSuccess = createAction(
  `${getAllAbonnement.type} Success`,
  props<{
    allAbonnement: IAbonnement[];
  }>()
);
