import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { RmqClientModule } from './rmq-client/rmq-client.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { ComandaModule } from './comanda/comanda.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsuarioModule,
    RmqClientModule,
    ComandaModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/usuario', method: RequestMethod.POST }, { path: '/usuario/login', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
