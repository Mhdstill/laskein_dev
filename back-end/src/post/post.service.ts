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
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const createdPost = await this.prismaService.post.create({
        data: createPostDto,
      });
      return createdPost;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.PostArgs = {}) {
    try {
      const posts = await this.prismaService.post.findMany({
        ...prismaArgs,
      });
      return posts;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.PostArgs = {}) {
    try {
      const post = await this.prismaService.post.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!post) {
        throw new NotFoundException(`post with id ${id} not found`);
      }
      return post;
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

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);
    try {
      const updatepost = await this.prismaService.post.update({
        where: { id: post.id },
        data: updatePostDto,
      });
      return updatepost;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const post = await this.findOne(id);
    return await this.prismaService.post.delete({ where: { id: post.id } });
  }
}
