import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateSubscriptionDto } from './create-subscription.dto';

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  autoRenewal: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  subscriptionId: string;
}
