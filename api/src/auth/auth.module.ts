import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RmqClientModule } from 'src/common/rmq-client/rmq-client.module';

@Module({
  imports: [RmqClientModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
