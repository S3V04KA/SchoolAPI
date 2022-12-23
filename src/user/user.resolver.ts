import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { NewUser } from 'src/graphql';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('users')
  async users() {
    return await this.userService.users();
  }

  @Query('user')
  async user(@Args('id') id: string) {
    return await this.userService.user(id);
  }

  @Mutation('createUser')
  async createUser(@Args('input') args: NewUser) {
    return await this.userService.createUser(args);
  }
}
