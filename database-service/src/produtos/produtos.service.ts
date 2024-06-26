import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtosRepository: Repository<Produto>,
    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>,
  ) { }
  createCategory(createCategoriaDto: CreateCategoriaDto) {
    try {
      const categoria = this.categoriasRepository.create(createCategoriaDto);
      return this.categoriasRepository.save(categoria);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new RpcException('Categoria já existe');
      }
      throw new RpcException(error);
    }
  }
  async create(createProdutoDto: CreateProdutoDto) {
    try {
      const { categoria, ...rest } = createProdutoDto;
      const selectedCategoria = await this.categoriasRepository.findOneBy({ id: categoria });
      const produto = this.produtosRepository.create({ ...rest, categoria: selectedCategoria });
      return this.produtosRepository.save(produto);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new RpcException('Produto já existe');
      }
      throw new RpcException(error);
    }
  }

  findAll() {
    try {
      return this.produtosRepository.find({
        relations: {
          categoria: true,
        }
      });
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  findOne(id: number) {
    try {
      return this.produtosRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  findByCategoria(categoryId: number) {
    try {
      return this.produtosRepository.find({
        where: {
          categoria: {
            id: categoryId
          }
        },
        relations: {
          categoria: true
        }
      });
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    throw new RpcException('Update not implemented');
  }

  remove(id: number) {
    throw new RpcException(`Delete not implemented`);
  }
}
