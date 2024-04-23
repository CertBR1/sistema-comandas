import { Inject, Injectable } from '@nestjs/common';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comanda } from './entities/comanda.entity';
import { Repository, Transaction } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { Deposito } from 'src/depositos/entities/deposito.entity';


@Injectable()
export class ComandasService {
  constructor(
    @InjectRepository(Comanda)
    private readonly comandasRepository: Repository<Comanda>,
    @InjectRepository(Deposito)
    private readonly depositosRepository: Repository<Deposito>,
  ) {
  }
  findOneWithoutDepositos(pin: string) {
    try {
      return this.comandasRepository.findOneBy({ pin: pin });
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }
  async create(createComandaDto: CreateComandaDto,) {
    const manager = this.comandasRepository.manager;
    try {
      const comanda = manager.create(Comanda, createComandaDto);
      const comandaCriada = await manager.save(comanda);
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

  async findOne(PIN: string) {
    try {
      const comanda = await this.comandasRepository.findOneBy({ pin: PIN });
      if (!comanda) {
        throw new RpcException('Comanda não existe');
      }
      const depositos = await this.depositosRepository.find({ where: { comanda: { id: comanda.id } } });
      console.log(depositos)
      return { ...comanda, depositos };
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  async update(id: number, updateComandaDto: UpdateComandaDto) {
    try {
      const transaction = await this.comandasRepository.manager.transaction(async transactionManager => {
        const queryBuilder = transactionManager.createQueryBuilder();
        const comanda = await queryBuilder
          .select('comanda')
          .from(Comanda, 'comanda')
          .where('comanda.id = :idComanda', { idComanda: id })
          .getOne();
        if (!comanda) {
          throw new RpcException('Comanda não existe');
        }
        comanda.saldo = updateComandaDto.saldo;
        return transactionManager.save(comanda);
      })
      return transaction
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} comanda`;
  }
}
