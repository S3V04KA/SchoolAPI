import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginUser, NewUser, SecureUser, Token } from 'src/graphql';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly tokenService: TokenService) {}

  async registerUser(input: NewUser): Promise<User | null | HttpException> {
    const existUsers = await this.userService.usersByLogin(input.login);
    if (existUsers.length > 0) return new HttpException('User exists', HttpStatus.FORBIDDEN);

    return this.userService.createUser(input);
  }

  async loginUser(input: LoginUser): Promise<User | null | HttpException | Token> {
    const existUsers = await this.userService.usersByLogin(input.login);
    if (!existUsers) return new HttpException('Wrong Data', HttpStatus.FORBIDDEN);

    const tok = await existUsers.map(async item => {
      if (await bcrypt.compare(input.password, item.password)) {
        item.password = ''
        const token = await this.tokenService.createToken({id: item.id, role: item.role});

        return { token: token };
      }
    })[0];

    if(tok)
      return tok

    return new HttpException('Wrong Data', HttpStatus.FORBIDDEN);
  }

  async validUser(input: SecureUser) {
    const user = await this.userService.user(Number(input.id));

    if (user) return true;
    return false;
  }
}
