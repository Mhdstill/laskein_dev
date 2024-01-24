import { Prisma } from '@prisma/index';

export interface HistoricalQuery {
  where?: Prisma.HistoricalWhereInput;
  include?: Prisma.HistoricalInclude;
  select?: Prisma.HistoricalSelect;
}
