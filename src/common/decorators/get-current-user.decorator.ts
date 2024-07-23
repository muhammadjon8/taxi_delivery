import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayloadWithRefreshToken } from "src/common/types";

export const GetCurrentUser = createParamDecorator(
  (
    data: keyof JwtPayloadWithRefreshToken | undefined,
    context: ExecutionContext
  ) => {
    const request = context.switchToHttp().getRequest();

    if (!data) {
      return request.user;
    }
    return request.user[data];
  }
);
