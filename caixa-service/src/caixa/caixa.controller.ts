import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CaixaService } from './caixa.service';
import { DepositoDto } from './dto/deposito-dto';
import { VendaDto } from './dto/venda-dto';


@Controller()
export class CaixaController {
  constructor(private readonly caixaService: CaixaService) { }

  @MessagePattern('createDeposit')
  deposito(@Payload() deposto: DepositoDto) {
    return this.caixaService.deposito(deposto);
  }


  @MessagePattern('createVenda')
  venda(@Payload() venda: VendaDto) {
    return this.caixaService.venda(venda);
  }

}
