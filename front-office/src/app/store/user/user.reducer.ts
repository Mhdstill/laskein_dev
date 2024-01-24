import { IUserState } from './user.model';
import { getUserById } from './user.actions';
import * as fromUser from './index';
import { createReducer, on } from '@ngrx/store';
import { from, filter } from 'rxjs';
import { IUser } from './user.interface';

const defaultUser = {
  id: '',
  firstName: '',
  lastName: '',
  username: '',
  photoUrl: '',
  isActif: true,
  phone: '',
  email: '',
  password: '',
  gender: '',
  birthDate: '',
  address: {
    id: '',
    firstAdress: '',
    secondAdress: '',
    zipCode: '',
    city: '',
    region: '',
    country: '',
    additionnalInformation: '',
    userId: '',
  },
};

export const initialUserState: IUserState = {
  user: defaultUser,
  isLoading: false,
};

const reducer = createReducer<IUserState>(
  initialUserState,

  // Get user by id
  on(fromUser.getUserById, (state: any) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromUser.getUserByIdSuccess, (state, { user }) => {
    return {
      ...state,
      isLoading: false,
      user,
    };
  }),
  // Update user
  on(fromUser.updateUser, state => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromUser.updateUserSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      isLoading: false,
    };
  }),
  // Update user address
  on(fromUser.updateUserAddress, state => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromUser.updateUserAddressSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      isLoading: false,
    };
  })
);

export function userReducer(
  state = initialUserState,
  actions: any
): IUserState {
  return reducer(state, actions);
}
