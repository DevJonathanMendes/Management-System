import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  app.use(compression());

  app.setGlobalPrefix('/api');

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
