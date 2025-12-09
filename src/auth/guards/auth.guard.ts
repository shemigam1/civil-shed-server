import {
  ExecutionContext,
  Injectable,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const res = await this.jwtService.verifyAsync(token);
      console.log(token.sub);
      console.log(res);

      request.user = {
        userId: res.sub,
        username: res.username,
      };
      //   console.log(request);

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
