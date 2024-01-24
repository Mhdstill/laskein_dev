import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import DashboardDTO from 'data/dto/Dashboard.dto';
import { DashboardInitialState } from './dashboard.interface';
import { getDashboardList } from './usecase/getList';

const initialState: DashboardInitialState = {
  dashboardList: [],
  dashboard: {} as DashboardDTO,
  isEditing: false,
  loading: false,
  activeUi: 'list',
  error: null,
  reloadDashboard: '',
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    cancelEditDashboard: (state) => {
      state.isEditing = false;
      state.dashboard = {} as DashboardDTO;
    },
    setActiveUi: (
      state,
      action: PayloadAction<'list' | 'form' | 'details'>
    ) => {
      state.activeUi = action.payload;
    },
    reloadDashboardList: (state, action) => {
      state.reloadDashboard = action.payload;
    },
  },
  extraReducers: {
    [getDashboardList.pending.type]: (state) => {
      state.loading = true;
    },
    [getDashboardList.fulfilled.type]: (state, action) => {
      state.dashboard = action.payload;
      state.loading = false;
    },
    [getDashboardList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEditDashboard, setActiveUi, reloadDashboardList } =
  dashboardSlice.actions;
