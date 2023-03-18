import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://178.47.46.58',
    credentials: true
  })
  await app.listen(3000);
}
bootstrap();
