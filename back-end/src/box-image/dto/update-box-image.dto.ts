import { PartialType } from '@nestjs/swagger';
import { CreateBoxImageDto } from './create-box-image.dto';

export class UpdateBoxImageDto extends PartialType(CreateBoxImageDto) {}
