import { Module } from '@nestjs/common';
import { ClassResolver } from './class.resolver';
import { ClassService } from './class.service';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  providers: [ClassResolver, ClassService, PrismaService, AuthGuard],
})
export class ClassModule {}
