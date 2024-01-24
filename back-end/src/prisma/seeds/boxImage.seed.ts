import { faker } from '@faker-js/faker';
import { prisma } from '../seed';

export const boxImageSeed = async () => {
  const status: any = ['CLOSED', 'OPENED', 'PLAYING', 'OTHER'];
  const box = await prisma.box.findMany({
    where: {
      boxImage: {
        none: {},
      },
    },
  });
  for (let i = 0; i < box.length; i++) {
    for (let j = 0; j < status.length; j++) {
      const boxImage = {
        photoUrl: faker.image.urlPicsumPhotos(),
        status: status[j],
        boxId: box[i].id,
      };
      await prisma.boxImage.create({
        data: boxImage,
      });
    }
  }
};
