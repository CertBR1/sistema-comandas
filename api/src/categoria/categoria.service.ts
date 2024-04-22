import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { validate } from 'class-validator';

@Injectable()
export class CategoriaService {
  constructor(
    @Inject('DATABASE_SERVICE')
    private readonly databaseService: ClientProxy,
  ) { }
  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      await validate(createCategoriaDto);
      const categoriaObsv = this.databaseService.send('createCategoria', createCategoriaDto);
      const categoria = await firstValueFrom(categoriaObsv);
      return categoria;
    } catch (error) {

      if (error.message === 'Categoria já existe' || error.code === '23505') {
        throw new HttpException('Categoria já existe', HttpStatus.CONFLICT);
      }
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  findAll() {
    try {
      const categoriasObsv = this.databaseService.send('findAllCategorias', {});
      const categorias = firstValueFrom(categoriasObsv);
      return categorias;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: number) {
    try {
      const categoriaObsv = this.databaseService.send('findOneCategoria', id);
      const categoria = firstValueFrom(categoriaObsv);
      return categoria;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
