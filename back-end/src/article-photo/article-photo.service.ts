import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticlePhotoDto } from './dto/create-article-photo.dto';
import { UpdateArticlePhotoDto } from './dto/update-article-photo.dto';

@Injectable()
export class ArticlePhotoService {
  constructor(private prismaService: PrismaService) {}

  async create(createArticlePhotoDto: CreateArticlePhotoDto) {
    try {
      const createdArticlePhoto = await this.prismaService.articlePhoto.create({
        data: createArticlePhotoDto,
      });
      return createdArticlePhoto;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.ArticlePhotoArgs = {}) {
    try {
      const articlePhotos = await this.prismaService.articlePhoto.findMany({
        ...prismaArgs,
      });
      return articlePhotos;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.ArticlePhotoArgs = {}) {
    try {
      const articlePhoto = await this.prismaService.articlePhoto.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!articlePhoto) {
        throw new NotFoundException(`articlePhoto with id ${id} not found`);
      }
      return articlePhoto;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `Provided hex string ${id} representation must be exactly 12 bytes`,
          );
        }
        throw error;
      }
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async update(id: string, updateArticlePhotoDto: UpdateArticlePhotoDto) {
    const articlePhoto = await this.findOne(id);
    try {
      const updatedarticlePhoto = await this.prismaService.articlePhoto.update({
        where: { id: articlePhoto.id },
        data: updateArticlePhotoDto,
      });
      return updatedarticlePhoto;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const articlePhoto = await this.findOne(id);
    return await this.prismaService.articlePhoto.delete({
      where: { id: articlePhoto.id },
    });
  }
}
