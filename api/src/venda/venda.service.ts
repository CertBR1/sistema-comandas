import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class VendaService {
  constructor(
    @Inject('CAIXA_SERVICE')
    private readonly caixaService: ClientProxy
  ) { }
  async create(createVendaDto: CreateVendaDto, usuarioId: number) {
    console.log(createVendaDto, usuarioId);

    try {
      const response = await firstValueFrom(this.caixaService.send('createVenda', {
        produtos: createVendaDto.produtos,
        usuarioId: usuarioId,
        comanda: createVendaDto.comanda
      }));

      return response;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all venda`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venda`;
  }

  update(id: number, updateVendaDto: UpdateVendaDto) {
    return `This action updates a #${id} venda`;
  }

  remove(id: number) {
    return `This action removes a #${id} venda`;
  }
}
