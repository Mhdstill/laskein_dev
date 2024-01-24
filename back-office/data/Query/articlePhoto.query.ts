import { Prisma } from '@prisma/index';

export interface ArticlePhotoQuery {
  where?: Prisma.ArticlePhotoWhereInput;
  include?: Prisma.ArticlePhotoInclude;
  select?: Prisma.ArticlePhotoSelect;
}
