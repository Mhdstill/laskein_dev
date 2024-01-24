import { createSlice } from '@reduxjs/toolkit';

type UiInitialState = {
  borderRadius: number;
  showSidebarLeft: boolean;
};

const uiInitialState: UiInitialState = {
  borderRadius: 6,
  showSidebarLeft: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState: uiInitialState,
  reducers: {
    changeBorderRadius: (state, action) => {
      state.borderRadius = +action.payload;
    },
    toggleSideBarleft: (state) => {
      state.showSidebarLeft = !state.showSidebarLeft;
    },
  },
});

export const { changeBorderRadius, toggleSideBarleft } = uiSlice.actions;
