import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  providers: [RolesService, PrismaService, AuthGuard],
  exports: [RolesService],
})
export class RolesModule {}
