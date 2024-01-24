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
import { SendMailService } from 'src/send-mail/send-mail.service';
import { CreateNewsLetterDto } from './dto/create-news-letter.dto';
import { UpdateNewsLetterDto } from './dto/update-news-letter.dto';

@Injectable()
export class NewsLetterService {
  constructor(
    private prismaService: PrismaService,
    private readonly mailservice: SendMailService,
  ) {}

  async create(createNewsLetterDto: CreateNewsLetterDto) {
    try {
      const createdNewsLetter = await this.prismaService.newsLetter.create({
        data: createNewsLetterDto,
      });
      await this.mailservice.sendMailToNewsletterSubscriber(
        createNewsLetterDto.email,
      );
      return createdNewsLetter;
    } catch (error) {
      throw error;
    }
  }

  async findAll(prismaArgs: Prisma.NewsLetterArgs = {}) {
    try {
      const newsLetters = await this.prismaService.newsLetter.findMany({
        ...prismaArgs,
      });
      return newsLetters;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException(`Query argument validation faild`);
      }
      throw error;
    }
  }

  async findOne(id: string, prismaArgs: Prisma.NewsLetterArgs = {}) {
    try {
      const newsLetter = await this.prismaService.newsLetter.findUnique({
        where: { id },
        ...prismaArgs,
      });
      if (!newsLetter) {
        throw new NotFoundException(`News Letter with id ${id} not found`);
      }
      return newsLetter;
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

  async update(id: string, updateNewsLetterDto: UpdateNewsLetterDto) {
    const newsLetter = await this.findOne(id);
    try {
      const updatednewsLetter = await this.prismaService.newsLetter.update({
        where: { id: newsLetter.id },
        data: updateNewsLetterDto,
      });
      return updatednewsLetter;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const newsLetter = await this.findOne(id);
    return this.prismaService.newsLetter.delete({
      where: { id: newsLetter.id },
    });
  }
}
