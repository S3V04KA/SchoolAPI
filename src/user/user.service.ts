import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { NewUser } from 'src/graphql';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async user(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id: Number(id) ? Number(id) : 0,
      },
    });
  }

  async userByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async users(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

  async me(id: number): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        id: id,
      },
      include: {
        class: true,
      },
    });
  }

  async createUser(input: NewUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(String(input.password), 5);
    return this.prisma.user.create({
      data: {
        dateOfCreation: new Date(),
        name: input.name,
        email: input.email,
        password: hashedPassword,
        age: input.age,
        avatarUrl: input.avatarUrl,
        classId: parseInt(input.classId),
        phoneNumber: input.phoneNumber,
        lastName: input.lastName,
        patronymic: input.patronymic,
        userRate: input.userRate,
        role: input.role,
      },
    });
  }
}
