import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../seed';

export const boxSeed = async () => {
  const nb = 50;
  const badge: any = ['TENDANCE', 'SOLDE'];
  const boxType = await prisma.boxType.findMany();
  for (let i = 0; i < nb; i++) {
    const randomIndexBoxType = Math.floor(Math.random() * boxType.length);
    const randomIndexBadge = Math.floor(Math.random() * badge.length);
    const prix: number = parseInt(faker.commerce.price({ min: 10, max: 500 }));
    const box = {
      reference: uuidv4(),
      name: faker.commerce.productName(),
      price: prix,
      number: faker.number.int({ min: 0, max: 10 }),
      description: faker.commerce.productDescription(),
      badge: badge[randomIndexBadge],
      boxTypeId: boxType[randomIndexBoxType].id,
    };

    await prisma.box.create({
      data: box,
    });
  }
};
