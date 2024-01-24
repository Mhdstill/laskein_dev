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
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Injectable()
export class SubCategoryService {
  constructor(private prismaService: PrismaService) {}

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    try {
      const createdSubCategory = await this.prismaService.subCategory.create({
        data: createSubCategoryDto,
      });
      return createdSubCategory;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.SubCategoryArgs = {}) {
    try {
      const subCategories = await this.prismaService.subCategory.findMany({
        ...prismaArgs,
      });
      return subCategories;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.SubCategoryArgs = {}) {
    try {
      const subCategory = await this.prismaService.subCategory.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!subCategory) {
        throw new NotFoundException(`subCategory with id ${id} not found`);
      }
      return subCategory;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // id is not a valid objectId
        if (error.code == 'P2023') {
          throw new BadRequestException(
            `subCategory hex string ${id} representation must be exactly 12 bytes`,
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

  async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto) {
    const subCategory = await this.findOne(id);
    try {
      const updatedSubcategory = await this.prismaService.subCategory.update({
        where: { id: subCategory.id },
        data: updateSubCategoryDto,
      });
      return updatedSubcategory;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const subCategory = await this.findOne(id);
    return await this.prismaService.subCategory.delete({
      where: { id: subCategory.id },
    });
  }
}
