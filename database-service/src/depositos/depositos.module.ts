import { Module } from '@nestjs/common';
import { DepositosService } from './depositos.service';
import { DepositosController } from './depositos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposito } from './entities/deposito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deposito])],
  controllers: [DepositosController],
  providers: [DepositosService],
})
export class DepositosModule { }
