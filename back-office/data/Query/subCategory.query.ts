import { Prisma } from '@prisma/index';

export interface SubCategoryQuery {
  where?: Prisma.SubCategoryWhereInput;
  include?: Prisma.SubCategoryInclude;
  select?: Prisma.SubCategorySelect;
}
