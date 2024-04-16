import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ComandaService {
  constructor(
    @Inject('DATABASE_SERVICE')
    private readonly databaseService: ClientProxy
  ) { }
  create(createComandaDto: CreateComandaDto) {
    try {
      this.databaseService.emit('createOneComanda', {});
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new HttpException('Comanda já existe', HttpStatus.CONFLICT);
      }
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all comanda`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comanda`;
  }

  update(id: number, updateComandaDto: UpdateComandaDto) {
    return `This action updates a #${id} comanda`;
  }

  remove(id: number) {
    return `This action removes a #${id} comanda`;
  }
}
