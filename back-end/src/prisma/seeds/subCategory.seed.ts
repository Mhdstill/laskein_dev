import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../seed';

export const subCategorySeed = async () => {
  const nb = 20;
  const category = await prisma.category.findMany();
  for (let i = 0; i < nb; i++) {
    const randomIndex = Math.floor(Math.random() * category.length);
    const subCategory = {
      reference: uuidv4(),
      name: faker.commerce.productName(),
      categoryId: category[randomIndex].id,
    };

    await prisma.subCategory.create({
      data: subCategory,
    });
  }
};
