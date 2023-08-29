import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ComplexModelService } from './complex-model.service';
import { NewComplexModel } from 'src/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthAdminGuard } from 'src/auth/auth-admin.guard';

@Resolver()
export class ComplexModelResolver {
  constructor(private readonly service: ComplexModelService) {}

  @Query('complexModel')
  async complexModel(@Args('id') id: number) {
    return await this.service.read(id);
  }

  @Query('complexModels')
  async complexModels() {
    return await this.service.readAll();
  }

  @UseGuards(new AuthAdminGuard())
  @Mutation('createComplexModel')
  async createComplexModel(@Args('input') input: NewComplexModel) {
    return await this.service.create(input);
  }
}
