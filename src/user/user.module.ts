import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  providers: [UserResolver, UserService, PrismaService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
