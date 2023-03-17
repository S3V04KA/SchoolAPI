import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { NewRole } from 'src/graphql';
import { RolesService } from 'src/roles/roles.service';

@Resolver()
export class GraphQLRoleResolver {
  constructor(private readonly roleService: RolesService) {}

  @Query('role')
  async role(@Args('id') id: number) {
    return await this.roleService.read(id);
  }

  @UseGuards(new AuthGuard())
  @Mutation('createRole')
  async createRole(@Context('user') user, @Args('input') input: NewRole) {
    if(user.role === "ADMIN") return await this.roleService.create(input);
    return new HttpException('No access', HttpStatus.FORBIDDEN);
  }
}
