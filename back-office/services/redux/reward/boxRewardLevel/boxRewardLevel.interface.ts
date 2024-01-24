import BoxRewardLevelDTO from 'data/dto/BoxRewardLevel.dto';

export interface BoxRewardLevelInitialState {
  boxRewardLevelList: BoxRewardLevelDTO[];
  boxRewardLevel: BoxRewardLevelDTO;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
  reloadBoxRewardLevel: string;
}
