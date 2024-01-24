import { Prisma } from '@prisma/index';

export interface PatronageQuery {
  where?: Prisma.PatronageWhereInput;
  include?: Prisma.PatronageInclude;
  select?: Prisma.PatronageSelect;
}
