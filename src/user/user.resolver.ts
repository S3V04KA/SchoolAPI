import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { NewUser } from 'src/graphql';
import { SecureUser } from 'src/Types/userTypes';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(new AuthGuard())
  @Query('users')
  async users(@Context('user') user: SecureUser) {
    if (user.role === 'ADMIN') return await this.userService.users();
    return new HttpException('No access', HttpStatus.FORBIDDEN);
  }

  @UseGuards(new AuthGuard())
  @Query('user')
  async user(@Context('user') user: SecureUser, @Args('id') id: string) {
    if (user.role === 'ADMIN') return await this.userService.user(id);
    return new HttpException('No access', HttpStatus.FORBIDDEN);
  }

  @UseGuards(new AuthGuard())
  @Query('me')
  async me(@Context('user') user: SecureUser) {
    return user;
  }

  @Mutation('createUser')
  async createUser(@Args('input') args: NewUser) {
    return await this.userService.createUser(args);
  }
}
