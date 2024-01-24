import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<any> {
    const isEmail = username.includes('@');
    let user;
    if (isEmail) {
      user = await this.authService.validateUser(username, password);
    } else {
      user = await this.authService.validateUserByUsername(username, password);
    }
    if (!user || !user.isActif) {
      throw new UnauthorizedException(
        `${
          user.isActif === false &&
          'Your account has been deactivated, contact the administrator'
        }`,
      );
    }
    return user;
  }
}
