import { UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { SecureUser, NewUser } from 'src/graphql';
import { UserService } from 'src/user/user.service';

@Resolver()
export class GraphQLUserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(new AuthGuard())
  @Query('users')
  async users(@Context('user') user) {
    if (user.role === 'ADMIN') return await this.userService.users();
    return new HttpException('No access', HttpStatus.FORBIDDEN);
  }

  @UseGuards(new AuthGuard())
  @Query('user')
  async user(@Context('user') user, @Args('id') id: string) {
    if (user.role === 'ADMIN') return await this.userService.user(Number(id));
    return new HttpException('No access', HttpStatus.FORBIDDEN);
  }

  @UseGuards(new AuthGuard())
  @Mutation('changePassword')
  async changePassword(@Context('user') user: SecureUser, @Args('lastPass') lpass: string, @Args('newPass') npass: string) {
    return await this.userService.changePassword(Number(user.id), {
      lastPassword: lpass,
      newPassword: npass,
    });
  }

  @UseGuards(new AuthGuard())
  @Query('me')
  async me(@Context('user') user: SecureUser) {
    if(user.id != null) return new HttpException('XUi', HttpStatus.NOT_FOUND)
    return await this.userService.me(Number(user.id));
  }

  @UseGuards(new AuthGuard())
  @Mutation('createUser')
  async createUser(@Context('user') user, @Args('input') args: NewUser) {
    if (user.role === 'ADMIN') return await this.userService.createUser(args);
    return new HttpException('No access', HttpStatus.FORBIDDEN);
  }

  @Query('getBalanceById')
  async getBalanceById(@Args('id') id: number) {
    return await this.userService.getBalance(id);
  }

  @UseGuards(new AuthGuard())
  @Query('getMyBalance')
  async getMyBalance(@Context('user') user) {
    return await this.userService.getBalance(user.id)
  }

  @UseGuards(new AuthGuard())
  @Mutation('setBalance')
  async setBalance(@Context('user') user, @Args('id') id: number, @Args('newBalance') newBalance: number){
    if(user.role !== 'ADMIN') return new HttpException('No access', HttpStatus.FORBIDDEN);
    return await this.userService.setBalance(id, newBalance)
  }
}
