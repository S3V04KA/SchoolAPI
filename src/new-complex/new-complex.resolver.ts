import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewComplexService } from './new-complex.service';
import { NewComplex, SecureUser } from 'src/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver()
export class NewComplexResolver {
  constructor(private readonly service: NewComplexService) {}

  @Query('complex')
  async complex(@Args('id') id: number) {
    return await this.service.read(id);
  }

  @Query('complexs')
  async complexs() {
    return await this.service.readAll();
  }

  @UseGuards(new AuthGuard())
  @Mutation('createComplex')
  async createComplex(@Context('user') user: SecureUser, @Args('input') input: NewComplex) {
    return await this.service.create(user.id, input, null);
  }
}
