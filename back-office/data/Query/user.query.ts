import { Prisma } from '@prisma/index';

export interface UserQuery {
  where?: Prisma.UserWhereInput;
  include?: Prisma.UserInclude;
  select?: Prisma.UserSelect;
}
