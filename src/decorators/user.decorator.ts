import { ExecutionContext, NotFoundException, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((data: string, context: ExecutionContext) => {
  const res = context.switchToHttp().getResponse();
  console.log(res.locals, 'decorator');
  if (!res.locals.user) {
    throw new NotFoundException("User not found.");
  }

  return res.locals.user;
})