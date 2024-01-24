import { Prisma } from '@prisma/index';

export interface BannerQuery {
  where?: Prisma.BannerImageWhereInput;
  include?: Prisma.BannerImageInclude;
  select?: Prisma.BannerImageSelect;
}
