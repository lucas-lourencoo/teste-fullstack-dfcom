import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors({
    allowedHeaders: ['content-type', 'authorization'],
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(8080);
}
bootstrap();
