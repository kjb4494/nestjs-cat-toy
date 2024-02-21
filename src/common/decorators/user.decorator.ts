import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// https://docs.nestjs.com/custom-decorators#param-decorators
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
