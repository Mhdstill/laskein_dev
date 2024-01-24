import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const defaultAdmin = [
  {
    firstName: 'Admin first name',
    lastName: 'Admin last name',
    username: 'superAdmin',
    email: 'admin@laskein.com',
    isActif: true,
    isMember: false,
    isAdmin: true,
    password: '1hy3djhvrdxtj4TX',
  },
];

export const seedDefaultAdmin = async () => {
  const prisma = new PrismaClient();
  await Promise.all(
    defaultAdmin.map(async (item) => {
      const user = await prisma.user.findFirst({
        where: {
          email: item.email,
        },
      });
      if (user) {
        console.info(`User ${user.email} alredy exist with id ${user.id}`);
        return;
      }
      try {
        console.info(`Creating user with email ${item.email}...`);
        // const adminRole = await prisma.role.findFirst({
        //   where: { name: 'Admin' },
        // });
        // if (!adminRole) {
        //   console.error(`Admin role not found`);
        //   return;
        // }
        const hasedPassword = await bcrypt.hash(
          item.password,
          await bcrypt.genSalt(10),
        );
        const createdUser = await prisma.user.create({
          data: { ...item, password: hasedPassword, stripeCustomerId: '' },
        });
        if (createdUser) {
          console.info(`User with email ${createdUser.email} created... ok`);
        }
      } catch (error) {
        console.log(error);
      }
    }),
  );
  return true;
};
