import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ComplexModel } from '@prisma/client';
import { NewComplexModel } from 'src/graphql';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ComplexModelService {
  constructor(private readonly prisma: PrismaService) {}

  async create(newCompexModel: NewComplexModel): Promise<ComplexModel | HttpException> {
    const conn = newCompexModel.productIds !== undefined ? newCompexModel.productIds.map<{ id: number }>(obj => ({ id: obj })) : [];
    const complexModel = this.prisma.complexModel.create({
      data: {
        hide: newCompexModel.hide,
        products: {
          connect: conn,
        },
      },
      include: {
        complexs: true,
        products: true,
      },
    });

    return complexModel;
  }

  async read(id: number): Promise<ComplexModel | HttpException> {
    const exist = this.prisma.complexModel.findFirst({
      where: {
        id: id,
      },
      include: {
        complexs: true,
        products: true,
      },
    });

    if (!exist) return new HttpException('Not found', HttpStatus.NOT_FOUND);

    return exist;
  }

  async readAll(): Promise<ComplexModel[]> {
    return this.prisma.complexModel.findMany({
      include: {
        complexs: true,
        products: true,
      },
    });
  }
}
