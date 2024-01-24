import { Prisma } from '@prisma/index';

export interface PostQuery {
  where?: Prisma.PostWhereInput;
  include?: Prisma.PostInclude;
  select?: Prisma.PostSelect;
}
