import BoxRewardLevelDTO from './BoxRewardLevel.dto';

export default interface RewardLevelDTO {
  id?: string;
  orderNumber: number;
  name: string;
  unlockThreshold?: number;
  description?: string;
  boxRewardLevel?: BoxRewardLevelDTO;
}
