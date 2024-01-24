import DailyRewardDTO from 'data/dto/DailyReward';

export interface DailyRewardInitialState {
  dailyRewardList: DailyRewardDTO[];
  dailyReward: DailyRewardDTO;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
  reloadDailyReward: string;
}
