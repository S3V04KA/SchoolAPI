import { UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { Resolver, Mutation, Context, Args, Query } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { ComplexService } from 'src/complex/complex.service';
import { SecureUser, NewComplex } from 'src/graphql';

@Resolver()
export class GraphQLComplexResolver {
  constructor(private readonly complexService: ComplexService) {}

  @UseGuards(new AuthGuard())
  @Mutation('createComplex')
  async createCompex(@Context('user') user: SecureUser, @Args('input') input: NewComplex) {
    if (user === null) return new HttpException('No user', HttpStatus.FORBIDDEN);

    return await this.complexService.create(Number(user.id), input);
  }

  @UseGuards(new AuthGuard())
  @Query('getComplexesByUserId')
  async getComplexesByUserId(@Context('user') user: SecureUser) {
    if (user === null) return new HttpException('No user', HttpStatus.FORBIDDEN);

    return await this.complexService.getComplexesByUser(Number(user.id));
  }

  @Query('complexesList')
  async complexesList() {
    return await this.complexService.getComplex();
  }

  @UseGuards(new AuthGuard())
  @Query('canEditComplex')
  async canEditComplex(@Context('user') user: SecureUser) {
    return await this.complexService.canEditComplex(user.id);
  }

  @UseGuards(new AuthGuard())
  @Mutation('changeComplex')
  async changeComplex(@Context('user') user: SecureUser, @Args('input') input: NewComplex) {
    return await this.complexService.week(user.id, input);
  }

  @UseGuards(new AuthGuard())
  @Query('getBackComplex')
  async getBackComplex(@Context('user') user: SecureUser, @Args('i') i: number) {
    return await this.complexService.getBackComplex(user.id, i);
  }
}
