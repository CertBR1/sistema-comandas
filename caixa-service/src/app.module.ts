import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CaixaModule } from './caixa/caixa.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CaixaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
