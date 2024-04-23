import { Module } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { VendasController } from './vendas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from './entities/venda.entity';
import { VendaProduto } from 'src/vendas-produtos/entities/vendas-produto.entity';
import { Comanda } from 'src/comandas/entities/comanda.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Produto } from 'src/produtos/entities/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venda, VendaProduto, Comanda, Usuario, Produto])],
  controllers: [VendasController],
  providers: [VendasService],
})
export class VendasModule { }
