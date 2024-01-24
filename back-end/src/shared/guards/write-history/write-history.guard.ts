import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { HistoricalService } from 'src/historical/historical.service';

@Injectable()
export class WriteHistoryGuard implements CanActivate {
  constructor(
    private readonly historicalService: HistoricalService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }
    const token = authorizationHeader.replace('Bearer ', '');
    try {
      const decodedToken = jwt.verify(
        token,
        this.configService.get('JWT_SECRET'),
      );
      const url = request.url;
      const method = request.method;
      const action = await this.convertMethodToAction(method);
      const model = await url.split('/')[1];
      const description = await this.generateDescriptionHistorical(
        action,
        model,
      );
      const userId: string = decodedToken.sub as any;
      console.log(method);
      // console.log(description);
      // console.log(model);
      // console.log(action);
      await this.historicalService.create({
        action,
        description,
        userId,
      });

      return true;
    } catch (error) {
      throw error;
    }
  }

  async convertMethodToAction(method: string): Promise<any> {
    switch (method) {
      case 'GET':
        return 'READ';
      case 'POST':
        return 'CREATE';
      case 'PATCH':
        return 'UPDATE';
      case 'DELETE':
        return 'DELETE';
      default:
        return 'READ';
    }
  }

  async generateDescriptionHistorical(
    action: string,
    model: string,
    _data?: any,
  ): Promise<string> {
    switch (action) {
      case 'READ':
        return `Lecture ${model} modele`;
      case 'CREATE':
        return `Creation ${model} modele`;
      case 'UPDATE':
        return `Mise a jour ${model} modele`;
      case 'DELETE':
        return `Suppression ${model} modele`;
      default:
        return '';
    }
  }
}
