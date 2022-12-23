import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Class } from '@prisma/client';
import { NewClass } from 'src/graphql';

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) {}

  async class(id: string): Promise<Class | null> {
    return this.prisma.class.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

  async classes(): Promise<Class[]> {
    return this.prisma.class.findMany();
  }

  async createClass(input: NewClass): Promise<Class> {
    return this.prisma.class.create({
      data: {
        classRate: input.classRate,
        letter: input.letter,
        number: input.number,
      },
    });
  }
}
