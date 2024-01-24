import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../seed';

export const articleSeed = async () => {
  const nb = 100;
  const type: any = ['MAN', 'WOMAN', 'CHILD'];
  const isAddToBox: any = [true, false];
  const box = await prisma.box.findMany();
  const provider = await prisma.provider.findMany();
  const unitySize = await prisma.unitySize.findMany();
  const subCategory = await prisma.subCategory.findMany();

  for (let i = 0; i < nb; i++) {
    const randomIndexType = Math.floor(Math.random() * type.length);
    const randomIndexIsAddToBox = Math.floor(Math.random() * isAddToBox.length);
    const randomIndexBox = Math.floor(Math.random() * box.length);
    const randomIndexProvider = Math.floor(Math.random() * provider.length);
    const randomIndexUnitySize = Math.floor(Math.random() * unitySize.length);
    const randomIndexSubCategory = Math.floor(
      Math.random() * subCategory.length,
    );

    const article = {
      reference: uuidv4(),
      designation: faker.commerce.product(),
      type: type[randomIndexType],
      size: `${faker.number.int({ min: 0, max: 100 })}/${faker.number.int({
        min: 5,
        max: 50,
      })}/${faker.number.int({ min: 5, max: 50 })}`,
      color: faker.color.human(),
      productUrl: faker.internet.url(),
      observation: faker.lorem.sentence(),
      winningChance: faker.number.int({ min: 0, max: 100 }),
      providerId: provider[randomIndexProvider].id,
      unitySizeId: unitySize[randomIndexUnitySize].id,
      subCategoryId: subCategory[randomIndexSubCategory].id,
      ...(isAddToBox[randomIndexIsAddToBox]
        ? { boxId: box[randomIndexBox].id }
        : {}),
    };

    await prisma.article.create({
      data: article,
    });
  }
};
