import { PartialType } from '@nestjs/swagger';
import { CreateBoxParamDto } from './create-box-param.dto';

export class UpdateBoxParamDto extends PartialType(CreateBoxParamDto) {}
