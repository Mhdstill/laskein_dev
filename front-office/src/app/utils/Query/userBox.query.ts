import { Prisma } from '@prisma/index';

export interface UserBoxQuery {
  where?: Prisma.UserBoxWhereInput;
  include?: Prisma.UserBoxInclude;
  select?: Prisma.UserBoxSelect;
}
