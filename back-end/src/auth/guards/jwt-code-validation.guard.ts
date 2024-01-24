import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtCodeValidationGuard extends AuthGuard('jwt-code-validation') {}
