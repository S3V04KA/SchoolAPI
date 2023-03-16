import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { NewUser, LoginUser, SecureUser } from 'src/graphql';

@Resolver()
export class GraphQLAuthResolver {
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
