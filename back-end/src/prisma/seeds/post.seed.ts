import { faker } from '@faker-js/faker';
import { prisma } from '../seed';

export const postSeed = async () => {
  const article = await prisma.article.findMany({
    where: {
      post: {
        none: {},
      },
    },
  });
  for (let i = 0; i < 2; i++) {
    const post = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      postUrl: faker.image.urlPicsumPhotos(),
      articleId: article[i].id,
    };
    await prisma.post.create({
      data: post,
    });
  }
};
