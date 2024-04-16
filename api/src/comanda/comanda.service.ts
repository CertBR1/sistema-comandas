import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateDepositoDto } from './dto/create-deposito.dto';

@Injectable()
export class ComandaService {
  deposit(createDepositoDto: CreateDepositoDto, PIN: string) {
    try {
      console.log(createDepositoDto, PIN);
    } catch (error) {

      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  constructor(
    @Inject('DATABASE_SERVICE')
    private readonly databaseService: ClientProxy
  ) { }
  async create(createComandaDto: CreateComandaDto) {
    try {
      const comandaObsv = this.databaseService.send('createComanda', {});
      const comanda = await firstValueFrom(comandaObsv);
      console.log(comanda)
      return comanda;
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

  findOne(PIN: string) {
    try {
      return this.databaseService.send('findOneComanda', PIN);
    } catch (error) {

    }
  }

  update(id: number, updateComandaDto: UpdateComandaDto) {
    return `This action updates a #${id} comanda`;
  }

  remove(id: number) {
    return `This action removes a #${id} comanda`;
  }
}
