import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Complex } from '@prisma/client';
import { ComplexCallback, NewComplex } from 'src/graphql';
import { PrismaService } from 'src/prisma.service';
import * as xlsx from 'xlsx';

@Injectable()
export class ComplexService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, complex: NewComplex, date): Promise<Complex> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const complexCr = await this.prisma.complex.create({
      data: {
        orders: [complex.mo, complex.tu, complex.we, complex.th, complex.fr],
        userId: user.id,
        dateOfCreation: date !== null ? new Date(date) : new Date(),
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

  async getComplexesByUser(userId: number): Promise<Complex[] | HttpException> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        complexes: true,
      },
    });

    if (!user) return new HttpException('No user', HttpStatus.FORBIDDEN);

    return user.complexes;
  }

  async getBackComplex(userId: number, i: number): Promise<Complex> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        complexes: true,
      },
    });

    return user.complexes.at(i);
  }

  async canEditComplex(userId): Promise<boolean> {
    const currentWeek = await this.getBackComplex(userId, -1);
    const newTime = new Date();

    return newTime.getTime() - currentWeek.dateOfCreation.getTime() < new Date(1000 * 60 * 60 * 8 + 1000 * 60 * 60 * 24 * 4).getTime();
  }

  async week(userId: number, input: NewComplex): Promise<ComplexCallback> {
    const currentWeek = await this.getBackComplex(userId, -1);

    if (await this.canEditComplex(userId))
      return {
        complex: {
          ...currentWeek,
          dateOfCreation: currentWeek.dateOfCreation.getTime().toString(),
        },
        isCurrentWeek: true,
        isEditable: false,
      };

    const complexUp = await this.prisma.complex.update({
      where: {
        id: currentWeek.id,
      },
      data: {
        orders: [input.mo, input.tu, input.we, input.th, input.fr],
        dateOfCreation: currentWeek.dateOfCreation,
      },
    });

    return {
      complex: {
        ...complexUp,
        dateOfCreation: complexUp.dateOfCreation.getTime().toString(),
      },
      isCurrentWeek: true,
      isEditable: true,
    };
  }

  async getActual(iter) {
    const newBook = xlsx.utils.book_new();
    newBook.Props = {
      Author: 'МАОУ СОШ 215',
      Language: 'RU',
      CreatedDate: new Date(),
      Title: 'Комлексное питание',
    };

    newBook.SheetNames.push('Питание');

    const data = [['', 'Класс', 'Фамилия', 'Имя', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница']];

    const classes = await this.prisma.class.findMany({
      where: {
        letter: { in: ['А', 'Б', 'В'] },
        number: { in: [10, 11] },
      },
      include: {
        Users: true,
      },
    });

    await Promise.all(
      classes.map(async c => {
        await Promise.all(
          c.Users.map(async (u, i) => {
            data.push([
              (i + 1).toString(),
              c.number + c.letter,
              u.lastName,
              u.name,
              ...(await this.getBackComplex(u.id, iter)).orders.map(v => (v === 0 ? 'Комплекс 1-й вариант' : 'Комплекс 2-й вариант')),
            ]);
          }),
        );
        data.push(['', '', '', '', '', '', '', '', '']);
      }),
    );

    newBook.Sheets['Питание'] = await xlsx.utils.aoa_to_sheet(data);

    await xlsx.writeFile(newBook, 'test.xlsx', {});

    return 'Success';
  }

  async getComplex() {
    const users = await this.prisma.user.findMany({
      where: {
        class: {
          number: { in: [11, 10] },
          letter: { in: ['А', 'Б', 'В'] },
        },
      },
      include: {
        complexes: true,
      },
    });

    await users.forEach(async user => {
      this.create(
        user.id,
        {
          fr: 0,
          mo: 0,
          th: 0,
          tu: 0,
          we: 0,
        },
        null,
      );
    });

    return await this.getActual(-2);
  }
}
