import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { prisma } from '../seed';

export const memberSeed = async () => {
  const password = '1hy3djhvrdxtj4TX';
  const nb = 50;
  for (let i = 0; i < nb; i++) {
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
    };

    const amount = faker.number.int({ min: 0, max: 10000 });

    await prisma.user.create({
      data: {
        ...user,
        isAdmin: false,
        isMember: true,
        stripeCustomerId: '',
        wallet: {
          create: {
            balance: amount,
          },
        },
      },
    });
  }
};
