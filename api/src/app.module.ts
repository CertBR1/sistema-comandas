import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { RmqClientModule } from './rmq-client/rmq-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsuarioModule,
    RmqClientModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule { }
