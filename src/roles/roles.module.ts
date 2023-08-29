import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthAdminGuard } from 'src/auth/auth-admin.guard';

@Module({
  providers: [RolesService, PrismaService, AuthGuard, AuthAdminGuard],
  exports: [RolesService],
})
export class RolesModule {}
