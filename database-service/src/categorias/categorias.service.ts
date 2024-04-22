import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { validate } from 'class-validator';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>,
  ) { }
  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      await validate(createCategoriaDto);
      const categoria = this.categoriasRepository.create(createCategoriaDto);
      return await this.categoriasRepository.save(categoria);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new RpcException('Categoria já existe');
      }
      throw new RpcException(error);
    }
  }

  findAll() {
    try {
      return this.categoriasRepository.find();
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  findOne(id: number) {
    try {
      return this.categoriasRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
