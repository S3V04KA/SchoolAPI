import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Role, User } from '@prisma/client';
import { NewUser } from 'src/graphql';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async user(id: number): Promise<User | null> {
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

  async usersByLogin(login: string): Promise<(User & { roleObj: Role })[] | null> {
    return this.prisma.user.findMany({
      where: {
        login: login,
      },
      include: {
        roleObj: true,
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

  async changePassword(id: number, input: { lastPassword: string; newPassword }, isAdmin: boolean): Promise<any> {
    const user = await this.me(id);

    if (!user) return new HttpException('No User', HttpStatus.NOT_FOUND);

    const validatePassword = await bcrypt.compare(input.lastPassword, user.password);

    if (validatePassword || isAdmin) {
      const hashedPass = await bcrypt.hash(String(input.newPassword), 5);

      const upUser = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          password: hashedPass,
        },
      });

      if (!upUser) return new HttpException('User down', HttpStatus.CONFLICT);

      return 'Success';
    }
    return new HttpException('Wrong Password', HttpStatus.FORBIDDEN);
  }

  async createUser(input: NewUser): Promise<User | HttpException> {
    const hashedPassword = await bcrypt.hash(String(input.password), 5);

    const role = await this.prisma.role.findFirst({
      where: {
        id: input.roleId,
      },
    });

    const clas = await this.prisma.class.findFirst({
      where: {
        id: input.classId,
      },
    });

    if (!role) {
      return new HttpException('No role', HttpStatus.NOT_FOUND);
    }
    if (!clas) {
      return new HttpException('No class', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.user.create({
      data: {
        dateOfCreation: new Date(),
        name: input.name,
        email: input.email,
        password: hashedPassword,
        age: input.age,
        avatarUrl: input.avatarUrl,
        phoneNumber: input.phoneNumber,
        lastName: input.lastName,
        patronymic: input.patronymic,
        userRate: input.userRate,
        roleObj: {
          connect: {
            id: role.id,
          },
        },
        class: {
          connect: {
            id: input.classId,
          },
        },
        balance: input.balance,
        login: input.login,
      },
    });
  }

  async getBalance(id: number): Promise<number | HttpException> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (user) return user.balance;
    return new HttpException('No User', HttpStatus.NOT_FOUND);
  }

  async setBalance(id: number, newBalance: number): Promise<number | HttpException> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (user)
      return (
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            balance: newBalance,
          },
        })
      ).balance;

    return new HttpException('No User', HttpStatus.NOT_FOUND);
  }
}
