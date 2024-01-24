import RewardLevelDTO from 'data/dto/RewardLevel.dto';

export interface RewardLevelInitialState {
  rewardLevelList: RewardLevelDTO[];
  rewardLevel: RewardLevelDTO;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
  activeUi: 'list' | 'form' | 'details' | 'box';
  reloadRewardLevel: string;
  showBoxRewardLevel: boolean;
}
