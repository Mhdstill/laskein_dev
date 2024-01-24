import { PartialType } from '@nestjs/swagger';
import { CreateOuterTransactionDto } from './create-outerTransaction.dto';

export class UpdateOuterTransactionDto extends PartialType(
  CreateOuterTransactionDto,
) {}
