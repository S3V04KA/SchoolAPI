import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUser, NewUser } from 'src/graphql';
import { UnauthorizedException } from '@nestjs/common/exceptions';

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
}
