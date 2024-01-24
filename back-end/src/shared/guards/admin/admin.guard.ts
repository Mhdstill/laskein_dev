import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }
    const token = authorizationHeader.replace('Bearer ', '');
    const { isAdmin }: any = jwt.verify(
      token,
      this.configService.get('JWT_SECRET'),
    );

    if (isAdmin === true) {
      return true;
    }

    throw new ForbiddenException(
      "Vous n'êtes pas autorisé à accéder à cette ressource.",
    );
  }
}
