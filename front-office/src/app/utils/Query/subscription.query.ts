import { Prisma } from '@prisma/index';

export interface SubscriptionQuery {
  where?: Prisma.SubscriptionWhereInput;
  include?: Prisma.SubscriptionInclude;
  select?: Prisma.SubscriptionSelect;
}
