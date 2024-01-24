import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthType = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (user.twoAuthIsActive) {
      return 'twoAuth';
    } else {
      return 'simpleAuth';
    }
  },
);
