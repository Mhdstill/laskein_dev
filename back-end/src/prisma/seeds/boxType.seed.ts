import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../seed';

export const boxTypeSeed = async () => {
  const nb = 10;
  for (let i = 0; i < nb; i++) {
    const boxType = {
      reference: uuidv4(),
      name: faker.commerce.productAdjective(),
    };

    await prisma.boxType.create({
      data: boxType,
    });
  }
};
