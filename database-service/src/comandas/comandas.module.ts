import { Module } from '@nestjs/common';
import { ComandasService } from './comandas.service';
import { ComandasController } from './comandas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comanda } from './entities/comanda.entity';
import { Deposito } from 'src/depositos/entities/deposito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comanda, Deposito])],
  controllers: [ComandasController],
  providers: [ComandasService],
})
export class ComandasModule { }
