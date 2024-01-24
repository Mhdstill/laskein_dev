import { Prisma } from '@prisma/index';

export interface ArticleQuery {
  where?: Prisma.ArticleWhereInput;
  include?: Prisma.ArticleInclude;
  select?: Prisma.ArticleSelect;
}
