import { Inject, Injectable } from '@nestjs/common';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comanda } from './entities/comanda.entity';
import { Repository, Transaction } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ComandasService {
  constructor(
    @InjectRepository(Comanda)
    private readonly comandasRepository: Repository<Comanda>,
  ) {

  }
  async create(createComandaDto: CreateComandaDto,) {
    const manager = this.comandasRepository.manager;
    try {
      const comanda = manager.create(Comanda, createComandaDto);
      const comandaCriada = await manager.save(comanda);
      console.log(comandaCriada);
      return comandaCriada;
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new RpcException('Comanda já existe');
      }
      throw new RpcException(error);
    }

  }
  findAll() {
    return this.comandasRepository.find();
  }

  findOne(PIN: string) {
    try {
      return this.comandasRepository.findOneBy({ pin: PIN });
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  async update(id: number, updateComandaDto: UpdateComandaDto) {
    try {
      console.log('UPDATECOMANDA', updateComandaDto);

      const updatedComanda = await this.comandasRepository.update(id, updateComandaDto);
      return updatedComanda
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} comanda`;
  }
}
