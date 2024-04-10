import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DepositosService } from './depositos.service';
import { CreateDepositoDto } from './dto/create-deposito.dto';
import { UpdateDepositoDto } from './dto/update-deposito.dto';

@Controller()
export class DepositosController {
  constructor(private readonly depositosService: DepositosService) {}

  @MessagePattern('createDeposito')
  create(@Payload() createDepositoDto: CreateDepositoDto) {
    return this.depositosService.create(createDepositoDto);
  }

  @MessagePattern('findAllDepositos')
  findAll() {
    return this.depositosService.findAll();
  }

  @MessagePattern('findOneDeposito')
  findOne(@Payload() id: number) {
    return this.depositosService.findOne(id);
  }

  @MessagePattern('updateDeposito')
  update(@Payload() updateDepositoDto: UpdateDepositoDto) {
    return this.depositosService.update(updateDepositoDto.id, updateDepositoDto);
  }

  @MessagePattern('removeDeposito')
  remove(@Payload() id: number) {
    return this.depositosService.remove(id);
  }
}
