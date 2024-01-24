import { createAction, props } from '@ngrx/store';
import { IUser } from './user.interface';

const prefix = '[User]';

//--------- get all user by Id -------//
export const getUserById = createAction(`${prefix} Get user by ID`);
export const getUserByIdSuccess = createAction(
  `${getUserById.type} Success`,
  props<{
    user: IUser;
  }>()
);

// ---------- Update user by ID -------------//
export const updateUser = createAction(
  `${prefix} Update User`,
  props<{
    user: IUser;
  }>()
);
export const updateUserSuccess = createAction(
  `${updateUser.type} Success`,
  props<{
    user: IUser;
  }>()
);

// ---------- Update user address -------------//
export const updateUserAddress = createAction(
  `${prefix} Update User address`,
  props<{
    user: IUser;
  }>()
);
export const updateUserAddressSuccess = createAction(
  `${updateUser.type} Success`,
  props<{
    user: IUser;
  }>()
);
