import { createSlice } from '@reduxjs/toolkit';
import UserDTO from 'data/dto/User.dto';
import { createUtilisateur } from './useCase/create';
import { deleteUtilisateur } from './useCase/delete';
import { editUtilisateur } from './useCase/edit';
import { getUtilisateur } from './useCase/get';
import { getUtilisateurList } from './useCase/getList';
import { updateUtilisateur } from './useCase/update';
import { UtilisateurInitialState } from './utilisateur.interface';

const initialState: UtilisateurInitialState = {
  utilisateurList: [],
  utilisateur: {} as UserDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadUtilisateur: '',
};

export const utilisatelurSlice = createSlice({
  name: 'utilisateur',
  initialState,
  reducers: {
    cancelEditUtilisateur: (state) => {
      state.isEditing = false;
      state.utilisateur = {} as UserDTO;
    },
    reloadUtilisateurList: (state, action) => {
      state.reloadUtilisateur = action.payload;
    },
  },
  extraReducers: {
    [getUtilisateur.pending.type]: (state) => {
      state.loading = true;
    },
    [getUtilisateur.fulfilled.type]: (state, action) => {
      state.utilisateur = action.payload;
      state.loading = false;
    },
    [getUtilisateur.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getUtilisateurList.pending.type]: (state) => {
      state.loading = true;
    },
    [getUtilisateurList.fulfilled.type]: (state, action) => {
      state.utilisateurList = action.payload;
      state.loading = false;
    },
    [getUtilisateurList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createUtilisateur.pending.type]: (state) => {
      state.loading = true;
    },
    [createUtilisateur.fulfilled.type]: (state) => {
      state.loading = false;
      state.utilisateur = {} as UserDTO;
    },
    [createUtilisateur.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateUtilisateur.pending.type]: (state) => {
      state.loading = true;
    },
    [updateUtilisateur.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.utilisateur = {} as UserDTO;
    },
    [updateUtilisateur.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteUtilisateur.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteUtilisateur.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteUtilisateur.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editUtilisateur.pending.type]: (state) => {
      state.loading = true;
    },
    [editUtilisateur.fulfilled.type]: (state, action) => {
      state.utilisateur = action.payload;
      state.isEditing = true;
      state.loading = false;
    },
    [editUtilisateur.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditUtilisateur, reloadUtilisateurList } =
  utilisatelurSlice.actions;
