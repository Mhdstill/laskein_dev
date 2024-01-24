import { faker } from '@faker-js/faker';
import { prisma } from '../seed';

export const articleImageSeed = async () => {
  const status: any = ['FIRST', 'SECOND', 'THIRD', 'LAST'];
  const article = await prisma.article.findMany({
    where: {
      articlePhoto: {
        none: {},
      },
    },
  });
  for (let i = 0; i < article.length; i++) {
    for (let j = 0; j < status.length; j++) {
      const articleImage = {
        photoUrl: faker.image.urlPicsumPhotos(),
        articleId: article[i].id,
        status: status[j],
      };
      await prisma.articlePhoto.create({
        data: articleImage,
      });
    }
  }
};
