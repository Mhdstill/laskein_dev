import { prisma } from '../seed';

export const rewardLevelSeed = async () => {
  const nb = 9;
  const unlockThresholds = [
    '51',
    '101',
    '202',
    '352',
    '449',
    '605',
    '775',
    '905',
    '1105',
  ];
  const allValue = [];
  for (let i = 0; i < nb; i++) {
    const rewardLevel = {
      orderNumber: i + 1,
      name: `t${i + 1}`,
      unlockThreshold: parseFloat(unlockThresholds[i]),
    };
    allValue.push(rewardLevel);
  }
  await prisma.rewardLevel.createMany({
    data: allValue,
  });
};
