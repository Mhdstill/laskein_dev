import { PartialType } from '@nestjs/swagger';
import { CreateUserBoxDto } from './create-user-box.dto';

export class UpdateUserBoxDto extends PartialType(CreateUserBoxDto) {}
