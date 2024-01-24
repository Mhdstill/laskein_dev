import { createSlice } from '@reduxjs/toolkit';
import UserDTO from '../../../data/dto/User.dto';
import axios from '../../../utils/axios';
import { fetchConnectedUser } from './useCases/fetchConnectedUser';
import { fetchNewAccesTokenRefreshToken } from './useCases/fetchNewAccesTokenRefreshToken';
import { fetchSelectedUser } from './useCases/fetchSelectedUser';
import { fetchUserList } from './useCases/fetchUserList';
import { forgotPwd } from './useCases/forgotPwd';
import { login } from './useCases/login';
import { logout } from './useCases/logout';
import { relogedConnectedUser } from './useCases/relogedConnectedUser';
import { setNewPwd } from './useCases/setNewPwd';
import { updateUser } from './useCases/updateUser';

export type AuthInitialState = {
  isLogedIn: boolean;
  user: UserDTO | undefined;
  isLoading: boolean;
  error: string;
  users: UserDTO[];
};

const initialState: AuthInitialState = {
  isLogedIn: false,
  user: undefined,
  isLoading: false,
  error: '',
  users: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogedIn = false;
      state.user = undefined;
      localStorage.removeItem('at');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
  extraReducers: {
    [login.fulfilled.type]: (state) => {
      state.isLogedIn = true;
    },
    [login.rejected.type]: (state) => {
      state.isLogedIn = false;
    },

    // fetch connected user
    [fetchConnectedUser.fulfilled.type]: (state, action) => {
      state.user = action.payload;
    },
    [fetchConnectedUser.rejected.type]: (state) => {
      state.user = undefined;
    },
    [relogedConnectedUser.fulfilled.type]: (state) => {
      state.isLogedIn = true;
    },

    // update user
    [updateUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [updateUser.rejected.type]: (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    },

    //get users
    [fetchUserList.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUserList.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [fetchUserList.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },

    // get selected user
    [fetchSelectedUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchSelectedUser.fulfilled.type]: (state, actions) => {
      state.isLoading = false;
      state.user = actions.payload;
    },
    [fetchSelectedUser.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    [logout.pending.type]: (state) => {
      state.isLoading = true;
    },
    [logout.fulfilled.type]: (state) => {
      state.isLogedIn = false;
      state.user = undefined;
    },
    [logout.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    [fetchNewAccesTokenRefreshToken.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchNewAccesTokenRefreshToken.fulfilled.type]: (state) => {
      state.isLogedIn = true;
    },
    [fetchNewAccesTokenRefreshToken.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    [forgotPwd.pending.type]: (state) => {
      state.isLoading = true;
    },
    [forgotPwd.fulfilled.type]: (state) => {
      // state.isLogedIn = true;
    },
    [forgotPwd.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },

    [setNewPwd.pending.type]: (state) => {
      state.isLoading = true;
    },
    [setNewPwd.fulfilled.type]: (state) => {
      // state.isLogedIn = true;
    },
    [setNewPwd.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});
