import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NewProduct, Product } from 'src/graphql';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(newProduct: NewProduct): Promise<Product | HttpException> {
    const productExist = await this.prisma.product.findFirst({
      where: {
        name: newProduct.name,
      },
    });

    if (productExist) return new HttpException('Exists', HttpStatus.FORBIDDEN);

    const conn = newProduct.categoryIds !== undefined ? newProduct.categoryIds.map<{ id: number }>(obj => ({ id: obj })) : [];

    const product = await this.prisma.product.create({
      data: {
        calories: newProduct.calories,
        carbohydrates: newProduct.carbohydrates,
        fats: newProduct.fats,
        hidden: newProduct.hidden,
        isComplex: newProduct.isComplex,
        name: newProduct.name,
        photoUrl: newProduct.photoUrl,
        price: newProduct.price,
        proteins: newProduct.proteins,
        weight: newProduct.weight,
        categorys: {
          connect: conn,
        },
      },
      include: {
        categorys: true,
        complexModels: true,
      },
    });

    return product;
  }

  async read(id: number): Promise<Product | HttpException> {
    const exist = this.prisma.product.findFirst({
      where: {
        id: id,
      },
    });

    if (!exist) return new HttpException('Not found', HttpStatus.NOT_FOUND);

    return exist;
  }

  async readAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }
}
