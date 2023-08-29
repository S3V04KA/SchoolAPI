import { UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthAdminGuard } from 'src/auth/auth-admin.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { SecureUser, NewUser } from 'src/graphql';
import { UserService } from 'src/user/user.service';

@Resolver()
export class GraphQLUserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(new AuthAdminGuard())
  @Query('users')
  async users() {
    return await this.userService.users();
  }

  @UseGuards(new AuthAdminGuard())
  @Query('user')
  async user(@Context('user') user, @Args('id') id: string) {
    return await this.userService.user(Number(id));
  }

  @UseGuards(new AuthGuard())
  @Mutation('changePassword')
  async changePassword(@Context('user') user: SecureUser, @Args('lastPass') lpass: string, @Args('newPass') npass: string) {
    return await this.userService.changePassword(
      Number(user.id),
      {
        lastPassword: lpass,
        newPassword: npass,
      },
      false,
    );
  }

  @UseGuards(new AuthAdminGuard())
  @Mutation('changePasswordAdmin')
  async changePasswordAdmin(@Context('user') user: SecureUser, @Args('lastPass') lpass: string, @Args('newPass') npass: string, @Args('userId') userId: number) {
    console.log(user.role.role);
    return await this.userService.changePassword(
      userId,
      {
        lastPassword: lpass,
        newPassword: npass,
      },
      true,
    );
  }

  @UseGuards(new AuthGuard())
  @Query('me')
  async me(@Context('user') user: SecureUser) {
    if (user.id == null) return new HttpException('no auth', HttpStatus.FORBIDDEN);
    return await this.userService.me(Number(user.id));
  }

  @UseGuards(new AuthAdminGuard())
  @Mutation('createUser')
  async createUser(@Context('user') user, @Args('input') args: NewUser) {
    return await this.userService.createUser(args);
  }

  @Query('getBalanceById')
  async getBalanceById(@Args('id') id: number) {
    return await this.userService.getBalance(id);
  }

  @UseGuards(new AuthGuard())
  @Query('getMyBalance')
  async getMyBalance(@Context('user') user) {
    return await this.userService.getBalance(user.id);
  }

  @UseGuards(new AuthAdminGuard())
  @Mutation('setBalance')
  async setBalance(@Args('id') id: number, @Args('newBalance') newBalance: number) {
    return await this.userService.setBalance(id, newBalance);
  }
}
