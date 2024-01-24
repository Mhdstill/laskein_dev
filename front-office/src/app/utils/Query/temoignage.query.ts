import { Prisma } from '@prisma/index';

export interface TemoignageQuery {
  where?: Prisma.TemoignageWhereInput;
  include?: Prisma.TemoignageInclude;
  select?: Prisma.TemoignageSelect;
}
