import { Module } from '@nestjs/common';
import { NewComplexService } from './new-complex.service';
import { NewComplexResolver } from './new-complex.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [NewComplexService, NewComplexResolver, PrismaService],
  exports: [NewComplexService],
})
export class NewComplexModule {}
