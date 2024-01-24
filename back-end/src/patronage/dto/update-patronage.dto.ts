import { PartialType } from '@nestjs/swagger';
import { CreatePatronageDto } from './create-patronage.dto';

export class UpdatePatronageDto extends PartialType(CreatePatronageDto) {}
