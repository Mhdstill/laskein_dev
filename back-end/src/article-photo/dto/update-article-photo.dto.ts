import { PartialType } from '@nestjs/swagger';
import { CreateArticlePhotoDto } from './create-article-photo.dto';

export class UpdateArticlePhotoDto extends PartialType(CreateArticlePhotoDto) {}
