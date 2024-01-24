import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class CodeConfirmTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-code-validation',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_CODE_CONFIRM,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const codeConfirmToken = req
      .get('Authorization')
      .replace('Bearer', '')
      .trim();
    return { id: payload.sub, email: payload.email, codeConfirmToken };
  }
}
