import { Module } from '@nestjs/common';
import { DepositosService } from './depositos.service';
import { DepositosController } from './depositos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposito } from './entities/deposito.entity';
import { Comanda } from 'src/comandas/entities/comanda.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deposito, Comanda, Usuario])],
  controllers: [DepositosController],
  providers: [DepositosService],
})
export class DepositosModule { }
