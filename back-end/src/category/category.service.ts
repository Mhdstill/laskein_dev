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
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const createdCategory = await this.prismaService.category.create({
        data: createCategoryDto,
      });
      return createdCategory;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.CategoryArgs = {}) {
    try {
      const categories = await this.prismaService.category.findMany({
        ...prismaArgs,
      });
      return categories;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.CategoryArgs = {}) {
    try {
      const category = await this.prismaService.category.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!category) {
        throw new NotFoundException(`category with id ${id} not found`);
      }
      return category;
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

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    try {
      const updatedcategory = await this.prismaService.category.update({
        where: { id: category.id },
        data: updateCategoryDto,
      });
      return updatedcategory;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    return this.prismaService.category.delete({ where: { id: category.id } });
  }
}
