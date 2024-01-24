import DashboardDTO from 'data/dto/Dashboard.dto';

export interface DashboardInitialState {
  dashboardList: DashboardDTO[];
  dashboard: DashboardDTO;
  isEditing: boolean;
  loading: boolean;
  reloadDashboard: string;
  [key: string]: any;
}
