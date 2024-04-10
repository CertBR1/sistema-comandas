import { Injectable } from '@nestjs/common';
import { CreateDepositoDto } from './dto/create-deposito.dto';
import { UpdateDepositoDto } from './dto/update-deposito.dto';

@Injectable()
export class DepositosService {
  create(createDepositoDto: CreateDepositoDto) {
    return 'This action adds a new deposito';
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
