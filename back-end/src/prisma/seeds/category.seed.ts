import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../seed';

export const categorySeed = async () => {
  const nb = 20;
  for (let i = 0; i < nb; i++) {
    const category = {
      reference: uuidv4(),
      name: faker.commerce.department(),
    };

    await prisma.category.create({
      data: category,
    });
  }
};
