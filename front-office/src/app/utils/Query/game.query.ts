import { Prisma } from '@prisma/index';

export interface GameQuery {
  where?: Prisma.GameWhereInput;
  include?: Prisma.GameInclude;
  select?: Prisma.GameSelect;
}
