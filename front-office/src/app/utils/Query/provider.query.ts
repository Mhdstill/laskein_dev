import { Prisma } from '@prisma/index';

export interface ProviderQuery {
  where?: Prisma.ProviderWhereInput;
  include?: Prisma.ProviderInclude;
  select?: Prisma.ProviderSelect;
}
