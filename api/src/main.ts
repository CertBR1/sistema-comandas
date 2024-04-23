import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  console.log(process.env.RMQ_URL);
  console.log(process.env.RMQ_AUTH_QUEUE);
  console.log(process.env.RMQ_DATABASE_QUEUE);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger))
  await app.listen(3000);
}
bootstrap();
