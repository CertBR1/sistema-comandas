import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Controller()
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) { }

  @MessagePattern('createCategoria')
  createCategory(@Payload() createCategoriaDto: CreateCategoriaDto) {
    return this.produtosService.createCategory(createCategoriaDto);
  }

  @MessagePattern('createProduto')
  create(@Payload() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }

  @MessagePattern('findAllProdutos')
  findAll() {
    return this.produtosService.findAll();
  }

  @MessagePattern('findOneProduto')
  findOne(@Payload() id: number) {
    return this.produtosService.findOne(id);
  }

  @MessagePattern('updateProduto')
  update(@Payload() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(updateProdutoDto.id, updateProdutoDto);
  }

  @MessagePattern('removeProduto')
  remove(@Payload() id: number) {
    return this.produtosService.remove(id);
  }
}
