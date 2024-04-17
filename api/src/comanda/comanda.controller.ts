import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ComandaService } from './comanda.service';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { CreateDepositoDto } from './dto/create-deposito.dto';
import { AccessLevel } from 'src/common/decorators/access-level.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';

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

  @Post(':id/deposito')
  @UseGuards(AuthGuard)
  @AccessLevel('caixa', 'admin')
  deposit(@Param('id') PIN: string, @Body() createDepositoDto: CreateDepositoDto, @Req() body) {
    const { authenticated } = body;
    const deposit = new CreateDepositoDto();
    deposit.PIN = PIN;
    deposit.idUsuario = authenticated.sub;
    deposit.valor = createDepositoDto.valor;
    return this.comandaService.deposit(deposit);
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
