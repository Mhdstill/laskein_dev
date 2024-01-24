import { PartialType } from '@nestjs/swagger';
import { CreateBoxArticleDto } from './create-box-article.dto';

export class UpdateBoxArticleDto extends PartialType(CreateBoxArticleDto) {}
