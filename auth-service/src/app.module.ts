import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RmqClientModule } from './rmq-client/rmq-client.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [RmqClientModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
