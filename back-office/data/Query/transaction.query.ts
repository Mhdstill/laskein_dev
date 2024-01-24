import { Prisma } from '@prisma/index';

export interface TransactionQuery {
  where?: Prisma.TransactionWhereInput;
  include?: Prisma.TransactionInclude;
  select?: Prisma.TransactionSelect;
}
