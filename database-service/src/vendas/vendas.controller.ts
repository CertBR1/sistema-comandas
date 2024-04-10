import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VendasService } from './vendas.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';

@Controller()
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @MessagePattern('createVenda')
  create(@Payload() createVendaDto: CreateVendaDto) {
    return this.vendasService.create(createVendaDto);
  }

  @MessagePattern('findAllVendas')
  findAll() {
    return this.vendasService.findAll();
  }

  @MessagePattern('findOneVenda')
  findOne(@Payload() id: number) {
    return this.vendasService.findOne(id);
  }

  @MessagePattern('updateVenda')
  update(@Payload() updateVendaDto: UpdateVendaDto) {
    return this.vendasService.update(updateVendaDto.id, updateVendaDto);
  }

  @MessagePattern('removeVenda')
  remove(@Payload() id: number) {
    return this.vendasService.remove(id);
  }
}
