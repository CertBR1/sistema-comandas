import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.RMQ_URL);
  console.log(process.env.RMQ_AUTH_QUEUE);
  console.log(process.env.RMQ_DATABASE_QUEUE);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
