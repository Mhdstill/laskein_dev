import { PrismaClient } from '@prisma/client';
// import { articleSeed } from './seeds/article.seed';
// import { articleImageSeed } from './seeds/articleImage.seed';
// import { boxSeed } from './seeds/box.seed';
// import { boxImageSeed } from './seeds/boxImage.seed';
// import { boxTypeSeed } from './seeds/boxType.seed';
// import { categorySeed } from './seeds/category.seed';
// import { seedDefaultAdmin } from './seeds/defaultAdmin.seed';
// import { memberSeed } from './seeds/member.seed';
// import { postSeed } from './seeds/post.seed';
// import { priceSeed } from './seeds/price.seed';
// import { providerSeed } from './seeds/provider.seed';
// import { subCategorySeed } from './seeds/subCategory.seed';
// import { unitySizeSeed } from './seeds/unitySize.seed';
import { dailyRewardSeed } from './seeds/dailyReward.seed';
// import { boxRewardLevelSeed } from './seeds/boxRewardLevel.seed';
// import { rewardLevelSeed } from './seeds/rewardLevel.seed';
export const prisma = new PrismaClient();

async function main() {
  console.log('Start database seeding...');
  // await seedDefaultAdmin();
  // await memberSeed();
  // await providerSeed();
  // await categorySeed();
  // await subCategorySeed();
  // await unitySizeSeed();
  // await boxTypeSeed();
  // await boxSeed();
  // await boxImageSeed();
  // await articleSeed();
  // await articleImageSeed();
  // await priceSeed();
  // await postSeed();
  await dailyRewardSeed();
  // await rewardLevelSeed();
  // await boxRewardLevelSeed();
}

main();
