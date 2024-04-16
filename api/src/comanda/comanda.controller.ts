import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComandaService } from './comanda.service';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { CreateDepositoDto } from './dto/create-deposito.dto';

@Controller('comanda')
export class ComandaController {
  constructor(private readonly comandaService: ComandaService) { }

  @Post()
  create(@Body() createComandaDto: CreateComandaDto) {
    return this.comandaService.create(createComandaDto);
  }

  @Get()
  findAll() {
    return this.comandaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comandaService.findOne(id);
  }

  @Post(':id')
  deposit(@Param('id') id: string, @Body() createDepositoDto: CreateDepositoDto) {
    return this.comandaService.deposit(createDepositoDto, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComandaDto: UpdateComandaDto) {
    return this.comandaService.update(+id, updateComandaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comandaService.remove(+id);
  }
}
