import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthAdminGuard } from 'src/auth/auth-admin.guard';
import { NewRole } from 'src/graphql';
import { RolesService } from 'src/roles/roles.service';

@Resolver()
export class GraphQLRoleResolver {
  constructor(private readonly roleService: RolesService) {}

  @UseGuards(new AuthAdminGuard())
  @Query('role')
  async role(@Args('id') id: number) {
    return await this.roleService.read(id);
  }

  @UseGuards(new AuthAdminGuard())
  @Mutation('createRole')
  async createRole(@Context('user') user, @Args('input') input: NewRole) {
    return await this.roleService.create(input);
  }

  // @Mutation('createRole')
  // async createRole(@Args('input') input: NewRole) {
  //   return await this.roleService.create(input);
  // }
}
