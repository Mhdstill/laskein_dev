import { Prisma } from '@prisma/index';

export interface RewardLevelQuery {
  where?: Prisma.RewardLevelWhereInput;
  include?: Prisma.RewardLevelInclude;
  select?: Prisma.RewardLevelSelect;
}
