import { Prisma } from '@prisma/index';

export interface BoxImageQuery {
  where?: Prisma.BoxImageWhereInput;
  include?: Prisma.BoxImageInclude;
  select?: Prisma.BoxImageSelect;
}
