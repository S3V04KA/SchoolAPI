import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUser, NewUser } from 'src/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { SecureUser } from 'src/graphql';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('registerUser')
  async registerUser(@Args('input') input: NewUser) {
    return this.authService.registerUser(input);
  }

  @Mutation('loginUser')
  async loginUser(@Args('input') input: LoginUser) {
    return this.authService.loginUser(input);
  }

  @UseGuards(new AuthGuard())
  @Query('validUser')
  async validUser(@Context('user') user: SecureUser) {
    return await this.authService.validUser(user);
  }
}
