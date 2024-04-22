import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProdutoService {
  constructor(
    @Inject('DATABASE_SERVICE')
    private readonly databaseService: ClientProxy
  ) { }
  async create(createProdutoDto: CreateProdutoDto) {
    try {
      const produtoObsv = this.databaseService.send('createProduto', createProdutoDto);
      const produto = await firstValueFrom(produtoObsv);
      return produto;
    } catch (error) {
      console.log(error);
      if (error.message === 'Produto já existe') {
        throw new HttpException('Produto já existe', HttpStatus.CONFLICT);
      }
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const produtosObsv = this.databaseService.send('findAllProdutos', {});
      const produtos = await firstValueFrom(produtosObsv);
      return produtos;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const produtosObsv = this.databaseService.send('findOneProduto', id);
      const produtos = await firstValueFrom(produtosObsv);
      return produtos;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
