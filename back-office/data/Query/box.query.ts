import { Prisma } from '@prisma/index';

export interface BoxQuery {
  where?: Prisma.BoxWhereInput;
  include?: Prisma.BoxInclude;
  select?: Prisma.BoxSelect;
}
