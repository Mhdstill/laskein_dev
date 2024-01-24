import { Prisma } from '@prisma/index';

export interface ShoppingCartQuery {
  where?: Prisma.ShoppingCartWhereInput;
  include?: Prisma.ShoppingCartInclude;
  select?: Prisma.ShoppingCartSelect;
}
