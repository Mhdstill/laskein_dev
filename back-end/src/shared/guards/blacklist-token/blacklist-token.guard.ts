import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlacklistTokenGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }
    const token = authorizationHeader.replace('Bearer ', '');

    const blacklistedToken = await this.prismaService.tokenBlackList.findUnique(
      {
        where: {
          token,
        },
      },
    );

    if (blacklistedToken) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
