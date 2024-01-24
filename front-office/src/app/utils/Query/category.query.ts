import { Prisma } from '@prisma/index';

export interface CategoryQuery {
  where?: Prisma.CategoryWhereInput;
  include?: Prisma.CategoryInclude;
  select?: Prisma.CategorySelect;
}
