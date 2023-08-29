import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { UseGuards } from '@nestjs/common';
import { AuthAdminGuard } from 'src/auth/auth-admin.guard';
import { NewCategory } from 'src/graphql';

@Resolver()
export class CategoryResolver {
  constructor(private readonly service: CategoryService) {}

  @Query('categoryes')
  async categoryes() {
    return await this.service.readAll();
  }

  @Query('category')
  async category(@Args('id') id: number) {
    return await this.service.read(id);
  }

  @UseGuards(new AuthAdminGuard())
  @Mutation('createCategory')
  async createCategory(@Args('input') args: NewCategory) {
    return await this.service.create(args);
  }
}
