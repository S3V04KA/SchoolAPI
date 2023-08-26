import { Injectable } from '@nestjs/common';
import { NewRole } from 'src/graphql';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: NewRole): Promise<Role> {
    return this.prisma.role.create({
      data: {
        role: input.name,
      },
    });
  }

  async read(input: number): Promise<Role & { users: User[] }> {
    return this.prisma.role.findFirst({
      where: {
        id: input,
      },
      include: {
        users: true,
      },
    });
  }
}
