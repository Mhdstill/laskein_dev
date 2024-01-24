import { prisma } from '../seed';

export const boxRewardLevelSeed = async () => {
  const box = await prisma.box.findMany();
  const lReward = await prisma.rewardLevel.findMany();
  const nbBox = [2, 4, 5, 6, 8, 10, 6, 7, 11];
  const allValue = [];
  for (let i = 0; i < lReward.length; i++) {
    for (let j = 0; j < nbBox[i]; j++) {
      const randomIndex = Math.floor(Math.random() * box.length);
      const boxRewardLevel = {
        boxId: box[randomIndex].id,
        rewardLevelId: lReward[i].id,
      };
      allValue.push(boxRewardLevel);
    }
  }
  await prisma.boxRewardLevel.createMany({
    data: allValue,
  });
};
