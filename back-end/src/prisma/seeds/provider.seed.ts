import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../seed';

export const providerSeed = async () => {
  const nb = 20;
  for (let i = 0; i < nb; i++) {
    const provider = {
      reference: uuidv4(),
      companyName: faker.company.name(),
      address: faker.company.buzzVerb(),
      phone: faker.phone.number('+48 91 ### ## ##'),
      webSite: faker.internet.url(),
      logo: faker.image.urlPicsumPhotos(),
      isPinned: false,
    };

    await prisma.provider.create({
      data: provider,
    });
  }
};
