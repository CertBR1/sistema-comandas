import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateDepositoDto } from './dto/create-deposito.dto';
import { response } from 'express';

@Injectable()
export class ComandaService {
  constructor(
    @Inject('DATABASE_SERVICE')
    private readonly databaseService: ClientProxy,
    @Inject('CAIXA_SERVICE')
    private readonly caixaService: ClientProxy
  ) { }

  async deposito(createDepositoDto: CreateDepositoDto) {
    try {
      console.log(createDepositoDto);
      const reponseObsv = this.caixaService.send('createDeposit', createDepositoDto)
      const reponse = await firstValueFrom(reponseObsv)
      return reponse;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
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

  async findAll() {
    try {
      const comandas = await firstValueFrom(this.databaseService.send('findAllComandas', {}));
      return comandas
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(PIN: string) {
    try {
      return this.databaseService.send('findOneComanda', PIN);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: number, updateComandaDto: UpdateComandaDto) {
    return `This action updates a #${id} comanda`;
  }

  remove(id: number) {
    return `This action removes a #${id} comanda`;
  }
}
