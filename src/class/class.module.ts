import { Module } from '@nestjs/common';
import { ClassResolver } from './class.resolver';
import { ClassService } from './class.service';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthAdminGuard } from 'src/auth/auth-admin.guard';

@Module({
  providers: [ClassResolver, ClassService, PrismaService, AuthGuard, AuthAdminGuard],
})
export class ClassModule {}
