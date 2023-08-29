import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category, NewCategory } from 'src/graphql';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(newCategory: NewCategory): Promise<Category | HttpException> {
    const exists = await this.prisma.category.findFirst({
      where: {
        name: newCategory.name,
      },
    });

    if (exists) return new HttpException('Exists', HttpStatus.FORBIDDEN);

    const conn = newCategory.productIds !== undefined ? newCategory.productIds.map<{ id: number }>(obj => ({ id: obj })) : [];

    const category = this.prisma.category.create({
      data: {
        name: newCategory.name,
        products: {
          connect: conn,
        },
      },
      include: {
        products: true,
      },
    });

    return category;
  }

  async read(id: number): Promise<Category | HttpException> {
    const category = await this.prisma.category.findFirst({
      where: {
        id: id,
      },
      include: {
        products: true,
      },
    });

    if (!category) return new HttpException('Not found', HttpStatus.NOT_FOUND);

    return category;
  }

  async readAll(): Promise<Category[] | HttpException> {
    const categories = await this.prisma.category.findMany({
      include: {
        products: true,
      },
    });

    if (!categories) return new HttpException('Not found', HttpStatus.NOT_FOUND);

    return categories;
  }
}
