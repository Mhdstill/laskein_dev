import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RuleInitialState = {
  showPemissionInRule: boolean;
  showModelInRule: boolean;
};

const uiInitialState: RuleInitialState = {
  showPemissionInRule: false,
  showModelInRule: false,
};

export const ruleSlice = createSlice({
  name: 'rule',
  initialState: uiInitialState,
  reducers: {
    togglePermissionInsideRule: (state, action: PayloadAction<boolean>) => {
      state.showPemissionInRule = action.payload;
    },
    toggleModelInsideRule: (state, action: PayloadAction<boolean>) => {
      state.showModelInRule = action.payload;
    },
  },
});

export const { togglePermissionInsideRule, toggleModelInsideRule } =
  ruleSlice.actions;
