import { PartialType } from '@nestjs/swagger';
import { CreateUnitySizeDto } from './create-unity-size.dto';

export class UpdateUnitySizeDto extends PartialType(CreateUnitySizeDto) {}
