import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginData, ILogin, LoginResponse } from './auth.types';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(input: ILogin): Promise<LoginData | null> {
    const user = await this.usersService.findUserByName(input.username);
    if (user && user.password === input.password) {
      const { password, ...data } = user;
      return data;
    }
    return null;
  }

  async authenticate(input: ILogin): Promise<LoginResponse | null> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.login(user);
  }

  async login(user: LoginData): Promise<LoginResponse> {
    const payload = {
      sub: user.userId,
      username: user.username,
    };
    // console.log(payload);

    const token = await this.jwtService.signAsync(payload);

    return { ...user, token };
  }
}
