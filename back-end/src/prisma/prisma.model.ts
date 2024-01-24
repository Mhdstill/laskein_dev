import { Injectable, Type } from '@nestjs/common';
import { PrismaDto } from './prisma.dto';

@Injectable()
export class PrismaModel {
  serviceOperator: Type;
  dataDto: PrismaDto;
  dataProperties: object;
  prismaService: any;
  tableName: string;
  tableService: any;

  constructor(
    _serviceOperator: Type,
    _dataDto: PrismaDto,
    _dataProperties: object,
    _prismaService: any,
    _tableName: string,
  ) {
    this.serviceOperator = _serviceOperator;
    this.dataDto = _dataDto;
    this.dataProperties = _dataProperties;
    this.prismaService = _prismaService;
    this.tableName = _tableName;
    this.tableService = this.prismaService[this.tableName];
  }

  public async save(inputToSave: Type): Promise<Type> {
    try {
      const dataToSave = await this.tableService.create({
        data: inputToSave,
        select: this.dataProperties,
      });

      return dataToSave;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, updateData: PrismaDto): Promise<Type> {
    const currentReccord = await this.tableService.findOne(id);
    try {
      const updatedReccord = await this.tableService.update({
        where: { id: currentReccord.id },
        data: updateData,
      });
      return updatedReccord;
    } catch (error) {
      throw error;
    }
  }

  public async remove(id: string): Promise<Type> {
    const reccord = await this.tableService.findOne(id);
    return this.tableService.delete({
      where: { id: reccord.id },
    });
  }

  public async findAll(prismaArgs: Type): Promise<Type[]> {
    try {
      const reccords = await this.tableService.findMany({
        select: {
          ...prismaArgs,
        },
      });
      return reccords;
    } catch (error) {
      throw error;
    }
  }
}

export class ErrorHandler {
  error: Error;
  message: string;

  constructor(_error: Error, _message: string) {
    this.error = _error;
    this.message = _message;
  }
}
