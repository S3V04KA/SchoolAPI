import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { NewUser } from 'src/graphql';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async user(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

  async users(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

  async createUser(input: NewUser): Promise<User> {
    return this.prisma.user.create({
      data: {
        dateOfCreation: new Date(),
        name: input.name,
        email: input.email,
        password: input.password,
        age: input.age,
        avatarUrl: input.avatarUrl,
        classId: parseInt(input.classId),
        phoneNumber: input.phoneNumber,
        lastName: input.lastName,
        patronymic: input.patronymic,
        userRate: input.userRate,
      },
    });
  }
}
