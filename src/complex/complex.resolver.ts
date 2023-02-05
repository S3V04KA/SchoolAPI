import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ComplexService } from './complex.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { NewComplex, SecureUser } from 'src/graphql';

@Resolver()
export class ComplexResolver {
  constructor(private readonly complexService: ComplexService) {}

  @UseGuards(new AuthGuard())
  @Mutation('createComplex')
  async createCompex(
    @Context('user') user: SecureUser,
    @Args('input') input: NewComplex,
  ) {
    if (user === null)
      return new HttpException('No user', HttpStatus.FORBIDDEN);

    return await this.complexService.create(Number(user.id), input);
  }
}
