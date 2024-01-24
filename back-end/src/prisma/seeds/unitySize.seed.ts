import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../seed';

export const unitySizeSeed = async () => {
  const nb = 10;
  for (let i = 0; i < nb; i++) {
    const unitySize = {
      name: faker.commerce.productMaterial() + '/' + uuidv4(),
      abbreviation:
        faker.string.alphanumeric({ length: { min: 5, max: 10 } }) +
        '/' +
        uuidv4(),
    };

    await prisma.unitySize.create({
      data: unitySize,
    });
  }
};
