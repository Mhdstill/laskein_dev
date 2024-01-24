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
import { CreateBoxArticleDto } from './dto/create-box-article.dto';
import { UpdateBoxArticleDto } from './dto/update-box-article.dto';

@Injectable()
export class BoxArticleService {
  constructor(private prismaService: PrismaService) {}

  async create(createBoxArticleDto: CreateBoxArticleDto) {
    try {
      const createdBoxArticle = await this.prismaService.boxArticle.create({
        data: createBoxArticleDto,
      });
      return createdBoxArticle;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.BoxArticleArgs = {}) {
    try {
      const boxArticle = await this.prismaService.boxArticle.findMany({
        ...prismaArgs,
      });
      return boxArticle;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.BoxArticleArgs = {}) {
    try {
      const boxArticle = await this.prismaService.boxArticle.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!boxArticle) {
        throw new NotFoundException(`boxArticle with id ${id} not found`);
      }
      return boxArticle;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `boxArticle hex string ${id} representation must be exactly 12 bytes`,
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

  async update(id: string, updateBoxArticleDto: UpdateBoxArticleDto) {
    const boxArticle = await this.findOne(id);
    try {
      const updatedBoxArticle = await this.prismaService.boxArticle.update({
        where: { id: boxArticle.id },
        data: updateBoxArticleDto,
      });
      return updatedBoxArticle;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const boxArticle = await this.findOne(id);
    return await this.prismaService.boxArticle.delete({
      where: { id: boxArticle.id },
    });
  }
}
