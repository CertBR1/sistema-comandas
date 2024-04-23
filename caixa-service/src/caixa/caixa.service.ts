import { Inject, Injectable } from '@nestjs/common';
import { CreateCaixaDto } from './dto/create-caixa.dto';
import { UpdateCaixaDto } from './dto/update-caixa.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { DepositoDto } from './dto/deposito-dto';
import { firstValueFrom } from 'rxjs';
import { VendaDto } from './dto/venda-dto';

@Injectable()
export class CaixaService {
  constructor(
    @Inject('DATABASE_SERVICE')
    private readonly databaseService: ClientProxy
  ) { }
  async deposito(deposito: DepositoDto) {
    console.log(deposito);
    try {
      const comandaObsv = this.databaseService.send('findOneComanda', deposito.PIN);
      const comandaParaDeposito = await firstValueFrom(comandaObsv);
      comandaParaDeposito.saldo = Number(comandaParaDeposito.saldo) + Number(deposito.valor);
      const updateComandaObsv = this.databaseService.send('updateComanda', comandaParaDeposito);
      const updateComanda = await firstValueFrom(updateComandaObsv);
      const depositoObsv = this.databaseService.send('createDeposito',
        {
          valor: deposito.valor,
          comandaId: comandaParaDeposito.id,
          usuarioId: deposito.idUsuario
        });
      const depositoCriado = await firstValueFrom(depositoObsv);
      return {
        comanda: updateComanda,
        deposito: depositoCriado
      }
    } catch (error) {
      console.log(error);
      throw new RpcException(error)
    }
  }
  async venda(venda: VendaDto) {
    try {
      let total = 0;
      for (const produto of venda.produtos) {
        const produtoComValor = await firstValueFrom(this.databaseService.send('findOneProduto', Number(produto.id)));
        total += Number(produtoComValor.valor) * Number(produto.quantidade);
      }
      const comanda = await firstValueFrom(this.databaseService.send('findOneComandaWithoutDepositos', venda.comanda));
      if (comanda.saldo < total) {
        throw new RpcException('Saldo insuficiente');
      }
      const comandaAtualizada = await firstValueFrom(this.databaseService.send('updateComanda', { ...comanda, saldo: comanda.saldo - total }));
      const vendaObsv = this.databaseService.send('createVenda', {
        valor_total: total,
        comandaId: comandaAtualizada.id,
        usuarioId: venda.usuarioId,
        produtos: venda.produtos
      });
      const vendaCriada = await firstValueFrom(vendaObsv);
      console.log(vendaCriada)
      return {
        comanda: comandaAtualizada,
        venda: vendaCriada
      }
    } catch (error) {
      console.log(error);
      throw new RpcException(error)
    }

  }
  vendas(data: any) {
    throw new Error('Method not implemented.');
  }
}
