import { Module } from '@nestjs/common';
import { GeneralResolversController } from './general-resolvers.controller';
import { ComplexModule } from 'src/complex/complex.module';

@Module({
  controllers: [GeneralResolversController],
  imports: [ComplexModule],
})
export class GeneralResolversModule {}
