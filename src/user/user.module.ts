import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthAdminGuard } from 'src/auth/auth-admin.guard';

@Module({
  providers: [UserService, PrismaService, AuthGuard, AuthAdminGuard],
  exports: [UserService],
})
export class UserModule {}
