import { Prisma } from '@prisma/index';

export interface OrderQuery {
  where?: Prisma.OrderWhereInput;
  include?: Prisma.OrderInclude;
  select?: Prisma.OrderSelect;
}
