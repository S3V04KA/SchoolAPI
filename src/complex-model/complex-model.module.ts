import { Module } from '@nestjs/common';
import { ComplexModelService } from './complex-model.service';
import { ComplexModelResolver } from './complex-model.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ComplexModelService, ComplexModelResolver, PrismaService],
  exports: [ComplexModelService],
})
export class ComplexModelModule {}
