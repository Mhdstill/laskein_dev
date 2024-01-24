import { createSlice } from '@reduxjs/toolkit';
import GameDTO from 'data/dto/Game.dto';
import { GameInitialState } from './game.interface';
import { createGame } from './useCase/create';
import { deleteGame } from './useCase/delete';
import { editGame } from './useCase/edit';
import { getGame } from './useCase/get';
import { getGameList } from './useCase/getList';
import { updateGame } from './useCase/update';

const initialState: GameInitialState = {
  gameList: [],
  game: {} as GameDTO,
  isEditing: false,
  loading: false,
  error: null,
  reloadGame: '',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    cancelEditPost: (state) => {
      state.isEditing = false;
      state.game = {} as GameDTO;
    },
    reloadGameList: (state, action) => {
      state.reloadGame = action.payload;
    },
  },
  extraReducers: {
    [getGame.pending.type]: (state) => {
      state.loading = true;
    },
    [getGame.fulfilled.type]: (state, action) => {
      state.game = action.payload;
      state.loading = false;
    },
    [getGame.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getGameList.pending.type]: (state) => {
      state.loading = true;
    },
    [getGameList.fulfilled.type]: (state, action) => {
      state.gameList = action.payload;
      state.loading = false;
    },
    [getGameList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createGame.pending.type]: (state) => {
      state.loading = true;
    },
    [createGame.fulfilled.type]: (state) => {
      state.loading = false;
      state.game = {} as GameDTO;
    },
    [createGame.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editGame.pending.type]: (state) => {
      state.loading = true;
    },
    [editGame.fulfilled.type]: (state, action) => {
      state.game = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editGame.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateGame.pending.type]: (state) => {
      state.loading = true;
    },
    [updateGame.fulfilled.type]: (state) => {
      state.loading = false;
      state.isEditing = false;
      state.game = {} as GameDTO;
    },
    [updateGame.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteGame.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteGame.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteGame.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditPost, reloadGameList } = gameSlice.actions;
