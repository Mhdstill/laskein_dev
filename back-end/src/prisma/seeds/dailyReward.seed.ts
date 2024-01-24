import { prisma } from '../seed';

export const dailyRewardSeed = async () => {
  const nb = 28;
  const box = await prisma.box.findMany();
  for (let i = 1; i <= nb; i++) {
    const randomIndex = Math.floor(Math.random() * box.length);
    const dailyReward = {
      number: i,
      boxId: box[randomIndex].id,
    };

    await prisma.dailyReward.create({
      data: dailyReward,
    });
  }
};
