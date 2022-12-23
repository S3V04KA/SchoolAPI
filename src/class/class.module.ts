import { Module } from '@nestjs/common';
import { ClassResolver } from './class.resolver';
import { ClassService } from './class.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ClassResolver, ClassService, PrismaService],
})
export class ClassModule {}
