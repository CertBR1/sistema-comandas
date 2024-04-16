import { Inject, Injectable } from '@nestjs/common';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comanda } from './entities/comanda.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ComandasService {
  constructor(
    @InjectRepository(Comanda)
    private readonly comandasRepository: Repository<Comanda>,
  ) {

  }
  create(createComandaDto: CreateComandaDto) {
    try {
      const comanda = this.comandasRepository.create(createComandaDto);
      return this.comandasRepository.save(comanda);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new RpcException('Comanda já existe');
      }
      throw new RpcException(error);
    }
  }
  findAll() {
    return this.comandasRepository.find();
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
