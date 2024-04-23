import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { VendaService } from './venda.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AccessLevel } from 'src/common/decorators/access-level.decorator';

@Controller('venda')
export class VendaController {
  constructor(private readonly vendaService: VendaService) { }

  @Post()
  @UseGuards(AuthGuard)
  @AccessLevel('caixa', 'admin')
  create(@Body() createVendaDto: CreateVendaDto, @Req() body) {
    const { authenticated } = body;
    return this.vendaService.create(createVendaDto, authenticated.sub);
  }

  @Get()
  findAll() {
    return this.vendaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendaDto: UpdateVendaDto) {
    return this.vendaService.update(+id, updateVendaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendaService.remove(+id);
  }
}
