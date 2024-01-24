import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../seed';

export const priceSeed = async () => {
  const articlesWithPrice = await prisma.article.findMany({
    include: {
      price: true,
    },
  });

  const articlesWithoutPrice = articlesWithPrice.filter(
    (article) => !article.price,
  );

  for (let i = 0; i < articlesWithoutPrice.length; i++) {
    const price = {
      reference: uuidv4(),
      currentPrice: faker.number.int({ min: 20, max: 2000 }),
      oldPrice: faker.number.int({ min: 20, max: 2000 }),
      rate: faker.number.int({ min: 0, max: 100 }),
      sellingPrice: faker.number.int({ min: 10, max: 500 }),
      reduction: faker.number.int({ min: 10, max: 100 }),
      articleId: articlesWithoutPrice[i].id,
    };
    await prisma.price.create({
      data: price,
    });
  }
};
