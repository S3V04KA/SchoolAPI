import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewRole } from 'src/graphql';
import { RolesService } from 'src/roles/roles.service';

@Resolver()
export class GraphQLRoleResolver {
  constructor(private readonly roleService: RolesService) {}

  @Query('role')
  async role(@Args('id') id: number) {
    return await this.roleService.read(id);
  }

  @Mutation('createRole')
  async createRole(@Args('input') input: NewRole) {
    return await this.roleService.create(input);
  }
}
