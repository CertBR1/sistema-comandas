import { Inject, Injectable } from '@nestjs/common';
import { CreateCaixaDto } from './dto/create-caixa.dto';
import { UpdateCaixaDto } from './dto/update-caixa.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { DepositoDto } from './dto/deposito-dto';
import { firstValueFrom } from 'rxjs';

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
  venda(data: any) {
    throw new Error('Method not implemented.');
  }
  vendas(data: any) {
    throw new Error('Method not implemented.');
  }
}
