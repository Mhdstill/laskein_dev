import { Prisma } from '@prisma/index';

export interface BoxParamsQuery {
  where?: Prisma.BoxParamsWhereInput;
  include?: Prisma.BoxParamsInclude;
  select?: Prisma.BoxParamsSelect;
}
