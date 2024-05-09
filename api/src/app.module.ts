import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { RmqClientModule } from './common/rmq-client/rmq-client.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { ComandaModule } from './comanda/comanda.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';
import { VendaModule } from './venda/venda.module';
import { LoggerModule } from 'nestjs-pino';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    LoggerModule.forRoot(),
    UsuarioModule,
    RmqClientModule,
    ComandaModule,
    CategoriaModule,
    ProdutoModule,
    VendaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/usuario', method: RequestMethod.POST },
        { path: '/usuario/login', method: RequestMethod.POST },
        { path: '/auth/validatetoken', method: RequestMethod.POST }
      )
      .forRoutes('*');
  }
}
