import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { NewProduct } from 'src/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthAdminGuard } from 'src/auth/auth-admin.guard';

@Resolver()
export class ProductResolver {
  constructor(private readonly service: ProductService) {}

  @Query('product')
  async product(@Args('id') id: number) {
    return await this.service.read(id);
  }

  @Query('products')
  async products() {
    return await this.service.readAll();
  }

  @UseGuards(new AuthAdminGuard())
  @Mutation('createProduct')
  async createProduct(@Args('input') input: NewProduct) {
    return await this.service.create(input);
  }
}
