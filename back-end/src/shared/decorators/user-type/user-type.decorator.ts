import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserType = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (user.isAdmin) {
      return 'admin';
    } else if (user.isMember) {
      return 'member';
    } else {
      return 'guest';
    }
  },
);
