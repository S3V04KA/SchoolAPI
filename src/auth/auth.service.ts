/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginUser, NewUser, Token } from 'src/graphql';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(
    input: NewUser,
  ): Promise<User | null | BadRequestException> {
    const existUser = await this.userService.userByEmail(input.email);
    if (existUser) return new BadRequestException('User exists');

    return this.userService.createUser(input);
  }

  async loginUser(
    input: LoginUser,
  ): Promise<User | null | BadRequestException | Token> {
    const existUser = await this.userService.userByEmail(input.login);
    if (!existUser) return new BadRequestException('Wrong data');
    const validatePassword = await bcrypt.compare(
      input.password,
      existUser.password,
    );
    if (!validatePassword) return new BadRequestException('Wrong data');

    const { password, ...secureUser } = existUser;

    const token = await this.tokenService.createToken(existUser);

    return { token: token };
  }
}
