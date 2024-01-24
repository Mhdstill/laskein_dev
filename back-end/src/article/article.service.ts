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
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(private prismaService: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    try {
      const createdArticle = await this.prismaService.article.create({
        data: createArticleDto,
      });
      return createdArticle;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.ArticleArgs = {}) {
    try {
      const articles = await this.prismaService.article.findMany({
        ...prismaArgs,
      });
      return articles;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.ArticleArgs = {}) {
    try {
      const article = await this.prismaService.article.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!article) {
        throw new NotFoundException(`article with id ${id} not found`);
      }
      return article;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `article hex string ${id} representation must be exactly 12 bytes`,
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

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const article = await this.findOne(id);
    try {
      const updatedarticle = await this.prismaService.article.update({
        where: { id: article.id },
        data: updateArticleDto,
      });
      return updatedarticle;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const article = await this.findOne(id);
    return this.prismaService.article.delete({ where: { id: article.id } });
  }
}
