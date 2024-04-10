import { Module } from '@nestjs/common';
import { VendasProdutosService } from './vendas-produtos.service';
import { VendasProdutosController } from './vendas-produtos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendaProduto } from './entities/vendas-produto.entity';
@Module({
  imports: [TypeOrmModule.forFeature([VendaProduto])],
  controllers: [VendasProdutosController],
  providers: [VendasProdutosService],
})
export class VendasProdutosModule { }
