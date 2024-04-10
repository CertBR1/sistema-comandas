import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ComandasModule } from './comandas/comandas.module';
import { DepositosModule } from './depositos/depositos.module';
import { ProdutosModule } from './produtos/produtos.module';
import { VendasModule } from './vendas/vendas.module';
import { VendasProdutosModule } from './vendas-produtos/vendas-produtos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true
    }),
    UsuariosModule,
    ComandasModule,
    VendasModule,
    ProdutosModule,
    DepositosModule,
    VendasProdutosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
