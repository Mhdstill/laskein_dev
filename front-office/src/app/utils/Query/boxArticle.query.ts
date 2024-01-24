import { Prisma } from '@prisma/index';

export interface BoxArticleQuery {
  where?: Prisma.BoxArticleWhereInput;
  include?: Prisma.BoxArticleInclude;
  select?: Prisma.BoxArticleSelect;
}
