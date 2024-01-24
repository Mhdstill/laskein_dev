import { PartialType } from '@nestjs/swagger';
import { CreateTemoignageDto } from './create-temoignage.dto';

export class UpdateTemoignageDto extends PartialType(CreateTemoignageDto) {}
