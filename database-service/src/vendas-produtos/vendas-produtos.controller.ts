import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VendasProdutosService } from './vendas-produtos.service';
import { CreateVendasProdutoDto } from './dto/create-vendas-produto.dto';
import { UpdateVendasProdutoDto } from './dto/update-vendas-produto.dto';

@Controller()
export class VendasProdutosController {
  constructor(private readonly vendasProdutosService: VendasProdutosService) {}

  @MessagePattern('createVendasProduto')
  create(@Payload() createVendasProdutoDto: CreateVendasProdutoDto) {
    return this.vendasProdutosService.create(createVendasProdutoDto);
  }

  @MessagePattern('findAllVendasProdutos')
  findAll() {
    return this.vendasProdutosService.findAll();
  }

  @MessagePattern('findOneVendasProduto')
  findOne(@Payload() id: number) {
    return this.vendasProdutosService.findOne(id);
  }

  @MessagePattern('updateVendasProduto')
  update(@Payload() updateVendasProdutoDto: UpdateVendasProdutoDto) {
    return this.vendasProdutosService.update(updateVendasProdutoDto.id, updateVendasProdutoDto);
  }

  @MessagePattern('removeVendasProduto')
  remove(@Payload() id: number) {
    return this.vendasProdutosService.remove(id);
  }
}
