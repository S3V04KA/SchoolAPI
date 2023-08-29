import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Complex } from '@prisma/client';
import { NewComplex } from 'src/graphql';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NewComplexService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, newComplex: NewComplex, date): Promise<Complex | HttpException> {
    const userExist = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userExist) return new HttpException('User not found', HttpStatus.NOT_FOUND);

    const cIds = [newComplex.moId, newComplex.tuId, newComplex.weId, newComplex.thId, newComplex.frId];

    const complex = this.prisma.complex.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        complexModels: {
          connect: cIds.map<{ id: number }>(obj => ({ id: obj })),
        },
        dateOfCreation: date !== null ? new Date(date) : new Date(),
      },
      include: {
        complexModels: true,
        user: true,
      },
    });

    return complex;
  }

  async readAll(): Promise<Complex[]> {
    return this.prisma.complex.findMany({
      include: {
        complexModels: true,
        user: true,
      },
    });
  }

  async read(id: number): Promise<Complex | HttpException> {
    const exist = this.prisma.complex.findFirst({
      where: {
        id: id,
      },
      include: {
        complexModels: true,
        user: true,
      },
    });

    if (!exist) return new HttpException('Not found', HttpStatus.NOT_FOUND);

    return exist;
  }
}
