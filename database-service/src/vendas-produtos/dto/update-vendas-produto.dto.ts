import { PartialType } from '@nestjs/mapped-types';
import { CreateVendasProdutoDto } from './create-vendas-produto.dto';

export class UpdateVendasProdutoDto extends PartialType(CreateVendasProdutoDto) {
  id: number;
}
