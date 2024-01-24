import BoxDTO from './Box.dto';
import RewardLevelDTO from './RewardLevel.dto';

export default interface BoxRewardLevelDTO {
  id?: string;
  boxId: string;
  box?: BoxDTO;
  rewardLevelId: string;
  RewardLevel?: RewardLevelDTO;
}
