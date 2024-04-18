import { Inject, Injectable } from '@nestjs/common';
import { CreateDepositoDto } from './dto/create-deposito.dto';
import { UpdateDepositoDto } from './dto/update-deposito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Deposito } from './entities/deposito.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Comanda } from 'src/comandas/entities/comanda.entity';

@Injectable()
export class DepositosService {
  constructor(
    @InjectRepository(Deposito)
    private readonly depositosRepository: Repository<Deposito>,
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    @InjectRepository(Comanda)
    private readonly comandasRepository: Repository<Comanda>,
  ) { }
  async create(createDepositoDto: CreateDepositoDto) {
    try {
      const comanda = await this.comandasRepository.findOneBy({ id: createDepositoDto.comandaId });
      const usuario = await this.usuariosRepository.findOneBy({ id: createDepositoDto.usuarioId });
      if (!comanda || !usuario) {
        throw new RpcException('Comanda ou Usuário não encontrado');
      }
      const deposito = this.depositosRepository.create({
        valor: createDepositoDto.valor,
        comanda: comanda,
        usuario: usuario
      });
      return await this.depositosRepository.save(deposito);
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  findAll() {
    return `This action returns all depositos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deposito`;
  }

  update(id: number, updateDepositoDto: UpdateDepositoDto) {
    return `This action updates a #${id} deposito`;
  }

  remove(id: number) {
    return `This action removes a #${id} deposito`;
  }
}
