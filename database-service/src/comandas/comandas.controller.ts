import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ComandasService } from './comandas.service';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { UpdateComandaDto } from './dto/update-comanda.dto';

@Controller()
export class ComandasController {
  constructor(private readonly comandasService: ComandasService) {}

  @MessagePattern('createComanda')
  create(@Payload() createComandaDto: CreateComandaDto) {
    return this.comandasService.create(createComandaDto);
  }

  @MessagePattern('findAllComandas')
  findAll() {
    return this.comandasService.findAll();
  }

  @MessagePattern('findOneComanda')
  findOne(@Payload() id: number) {
    return this.comandasService.findOne(id);
  }

  @MessagePattern('updateComanda')
  update(@Payload() updateComandaDto: UpdateComandaDto) {
    return this.comandasService.update(updateComandaDto.id, updateComandaDto);
  }

  @MessagePattern('removeComanda')
  remove(@Payload() id: number) {
    return this.comandasService.remove(id);
  }
}
