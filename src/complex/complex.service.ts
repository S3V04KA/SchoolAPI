import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Complex } from '@prisma/client';
import { NewComplex } from 'src/graphql';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ComplexService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(
    userId: number,
    complex: NewComplex,
  ): Promise<Complex | HttpException> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user === null)
      return new HttpException('No user', HttpStatus.FORBIDDEN);

    const complexCr = await this.prisma.complex.create({
      data: {
        orders: [complex.mo, complex.tu, complex.we, complex.th, complex.fr],
        userId: user.id,
      },
      include: {
        user: true,
      },
    });

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        complexes: {
          connect: {
            id: complexCr.id,
          },
        },
      },
    });

    return complexCr;
  }
}
